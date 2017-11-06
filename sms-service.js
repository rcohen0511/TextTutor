//twilio api calls
var twilio = require('twilio');
var client = require('twilio')(
    // process.env.TWILIO_ACCOUNT_SID,
    // process.env.TWILIO_AUTH_TOKEN
    'ACc694cec59a35c6b5830571760dc626a6',
    'af0ddb5adb3d8d38d04babd5b03b24db'
);


// ================================================================
// Setup HTTP Server and App parser 
// ================================================================
var http = require('http');
var bodyParser = require('body-parser');
var app = require('express')();
//app is using body parser to parse the request body
app.use(bodyParser.urlencoded({
    extended: false
}));

http.createServer(app).listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port 3000");
});


// ================================================================
// Catches a text message from a user and do action
// ================================================================
app.post('/sms', function (request, response) {
    var msgBody = request.body.Body;
    var userPhone = request.body.From;

    if(msgBody.toLowerCase().trim() == 'join'){
        addUserToSql(userPhone);
    } else if(msgBody.toLowerCase().trim() == 'start quiz' && checkRegistration(userPhone)){
        takeQuiz(userPhone);
    }
    }else{
        InvalidUserInputText(userPhone, msgBody)
    }
});



// ================================================================
// App Logic
// ================================================================
function startLesson(){
    // Set who wants quiz to false
    var phoneNumbers = getPhoneNumbers();
    sendInformationText(phoneNumbers);
    // Info message should end with do you want to take a quiz?
}

function sendInformationText(phoneNumbers){
    // loops through numbers

}

function checkRegistration(phonenumber){
    // Check if user exists in DB
    if (checkNumberExists(phonenumber)){
        return True;
    }
}

function takeQuiz(phonenumber){
    // Modify DB to reflect that user is taking the quiz
}

// ================================================================
// Admin Console
// ================================================================
app.get('/admin', function (req, res) {
    displayForm(res);
});

app.post('/admin', function (req, res) {
    formSubmission(req, res);
    console.log('Admin Submitted Data');
    startLesson();
    console.log('Lesson Started');    
})


// ================================================================
// jQuery Form
// ================================================================
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var port = process.env.PORT || 3000;

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
};

var values = [];
function formSubmission(req, res) {
    // Setting up Form
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        fields[field] = value;
        values.push(value);
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.end(util.inspect({
            fields: fields
        }));

    // Printing Out Form
        console.log(values);
    });
    form.parse(req);
}

// ================================================================
// Twillio Messages
// ================================================================
function InvalidUserInputText(phonenumber, text){
    console.log('User inserted incorrect text: '+text)
    client.messages.create({
        from: '+19149966800',
        to: phonenumber,
        body: "Please check your spelling, text 'join' to join the class"
    }, function (err, message) {
        if (err) console.error(err.message);
    });
}

// ================================================================
//database is set up here 
// ================================================================
function readSql() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: 'db'
    });
    con.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connection established');
    });
    con.query('select * from class', function (error, rows, fields) {
        if (error) throw error;
        console.log(rows[0]['phonenumber']);
    });
    con.end();
}

function addUserToSql(phonenumber) {
    // Twilio Message Functions
    function successfullyAddedText(phonenumber){
        console.log("Success Message being sent")
        client.messages.create({
            from: '+19149966800',
            to: phonenumber,
            body: "Congrats you've been successfully added"
        }, function (err, message) {
            if (err) console.error(err.message);
        });
    }

    // Connection to SQL
    console.log('Adding phonenumber: '+phonenumber+' to DB')
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: 'db'
    });
    con.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connection established');
    });

    // Insert Statement
    con.query('insert into class (`phonenumber`) value (?)', [phonenumber], function (error, rows, fields) {
        if (error) throw error;
    });
    // Close connection
    con.end();
    // END SQL
    successfullyAddedText(phonenumber);
}

function checkNumberExists(phonenumber){
    var exists;
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: 'db'
    });
    con.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connection established');
    });
    con.query('select * from class where (?)', [phonenumber],function (error, rows, fields) {
        if (error) {
            throw error;
            exists = False;
            console.log('Phone Number: '+phonenumber+' does not exist in DB')
        }
        console.log(rows[0]['phonenumber']);
        exists = True;
    });
    con.end();
    return exists;
}


