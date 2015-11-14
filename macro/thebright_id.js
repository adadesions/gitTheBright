var fs = require('fs');
var prefix = 'HYEX';
var init = 121500;

for(var i=0;i<1247;i++){
  var data = prefix+(init+i)+'\n';
  fs.appendFileSync('theBrightId.txt', data);
  console.log(data);
}
