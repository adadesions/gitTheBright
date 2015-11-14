var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paidSchema = new Schema({
	course: String,
	thebright_id: String,
	channel: String,
	paid_datetime: Date,
	amount: String,
	transfer_slip: String,
	full_name: String,
	school: String,
	email: String,
	tel: String,
	detail: String,
});

paidSchema.methods.slipPath = function(){
	 this.transfer_slip = this.transfer_slip.substring(7)
	 console.log(this.transfer_slip);
}

paidSchema.methods.eachSlip = function(paids){
	for(var paid in paids){
		paid.transfer_slip = slipPath(paid)
		console.log(paid.transfer_slip);
	}
}

var Paid = mongoose.model('paids', paidSchema);
module.exports = Paid
