var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vipSchema = new Schema({
  thebright_id: String,
  amount: String,
  full_name: String,
  school: String,
  email: String,
  tel: String,
  detail: String
});


var Vip = mongoose.model('vips', vipSchema);
module.exports = Vip
