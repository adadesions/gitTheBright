var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentsSchema = new Schema({
	course: String,
	id_card : String,
	prefix : String,
	full_name: String,
	birthday: String,
	school: String,
	level: String,
	major: String,
	address: String,
	mobile: String,
	email: String,
	facebook_account: String,
	line_account: String,
	parents_name: String,
	parents_relationship: String,
	parents_number: String,	
});

studentsSchema.methods.checkStatus = function(paids){
	 var f_name = this.full_name
	 	 email = this.email;

}

studentsSchema.methods.hey = function(){
	console.log("HEY");
}

var Student = mongoose.model('students', studentsSchema);
module.exports = Student