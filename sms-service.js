//twilio api calls
var twilio = require('twilio');
var client = require('twilio')(
    // process.env.TWILIO_ACCOUNT_SID,
    // process.env.TWILIO_AUTH_TOKEN
    'ACc694cec59a35c6b5830571760dc626a6',
    'af0ddb5adb3d8d38d04babd5b03b24db'
);



//basic http setup 
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



//this is catching a text
app.post('/sms', function (request, response) {
    var msgBody = request.body.Body;
//    console.log(msgBody); //provides unparsed request body
    if(msgBody.toLowerCase().trim() == 'join'){
//        console.log(request.body);      //provides parsed body
//        console.log(request.body.From); //provides sender number
    }else{
        console.log('Please check your spelling!');
    }
});



//database is set up here 
//### ### ### ### ### ### 
function readSql() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
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
var phonenumber = '1-444-312-1534';

function addUserToSql() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: 'db'
    });
    con.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connection established');
    });

    //	'UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId],
    con.query('insert into class (`phonenumber`) value (?)', [phonenumber], function (error, rows, fields) {
        if (error) throw error;
    });
    con.end();
}
