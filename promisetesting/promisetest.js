function printThis(){
	console.log('this 27');
	return true;
}
console.log('globalscope happens first');
var promise = new RSVP.Promise(function(fulfill,reject){
	var thisthis = printThis();
	if(thisthis) fulfill(thisthis);
	else reject(thisthis);
});

promise.then(function(toss){
	console.log('that 38');
})