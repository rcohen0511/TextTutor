function printThis() {
	console.log('this 27');
	return true;
}
console.log('globalscope happens first');
var promise = new RSVP.Promise(function (fulfill, reject) {
	var thisthis = printThis();
	if (thisthis) fulfill(thisthis);
	else reject(thisthis);
});
promise.then(function (toss) {
	console.log('that 38');
})


const mysql = require('mysql');
class Database {
	constructor(config) {
		this.connection = mysql.createConnection(config);
	}
	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
}