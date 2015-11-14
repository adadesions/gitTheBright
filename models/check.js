var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkSchema = new Schema({
  thebright_id: String,
  amount: String,
  full_name: String,
  school: String,
  email: String,
  tel: String,
  detail: String
});


var Check = mongoose.model('checks', checkSchema);
module.exports = Check
