var express = require('express');
var qr = require('qr-image');
var fs = require('fs');
var Student = require('../models/student.js');
var Paid = require('../models/paid.js');
var Vip = require('../models/vip.js');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

router.get('/home', function(req, res, next) {
  res.render('index');
});

router.get('/mobile', function(req, res, next) {
	res.render('mobile/m-index')
});

router.get('/mobile/m-smartpass/', function(req,res){
  //Production
  var tbid = req.query.searchsmp;
  tbid = tbid.toUpperCase();
  // res.send("WORK"+tbid);
  if(tbid){
    var qrcode = qr.image('http://thebright.in.th/check/'+tbid, {type: 'png'});

    var output = fs.createWriteStream('public/qrcode/'+tbid+'.png');
    qrcode.pipe(output);

      Vip.findOne({thebright_id: tbid}, function(err,data){
          if(err) throw err;
          else{
              if(data) res.render('mobile/m-smartpass', {res: data, status: true});
              else res.render('mobile/m-smartpass', {status: false});
          }
      });
  }
  else res.render('m-searchsmp', {status: 'Not Found'});

});

router.get('/mobile/:page', function(req, res, next) {
  	req_c = req.params.page
  	poster_path = ['expo-detail.jpg', 'expo-apply.jpg', 'expo-program.png','expo-faq.jpg']
  	target = 'mobile/m-img-template';

  	switch(req_c){
  		case 'expo-detail': res.render('mobile/m-detail');
  			  break;
  		case 'expo-apply' : res.render(target, {poster_path: poster_path[1]});
  			  break;
      case 'expo-faq' : res.render(target, {poster_path: poster_path[3]});
          break;
  		default: res.render('mobile/'+req.params.page)
  	}

});

router.get('/:page', function(req, res, next) {
	if(req.params.page == 'thebright-expo')
		res.render('expo');
	else
		res.render(req.params.page);
});

router.get('/about/:sec', function(req, res, next) {
	target = 'about/'+req.params.sec;
	renderHelper(target,res);
});

router.get('/courses/:course', function(req, res, next) {
	target = 'courses/course-template'
	banner = ['banner-m4.png', 'banner-m5.png', 'banner2.jpg']
	poster = ['m4_poster', 'm5_poster', 'm6_poster']
	req_c = req.params.course;

	switch(req_c){
		case 'hybrid-m4': res.render(target, {img_path:banner[0], poster_path: poster[0]});
			  break
		case 'hybrid-m5': res.render(target, {img_path:banner[1], poster_path: poster[1]});
			  break
		case 'coach-me': res.render(target, {img_path:banner[2], poster_path: poster[2]});
			  break
		default : res.render('comingsoon');
	}

});

router.get('/form/:formname', function(req, res, next) {
	target = req.params.formname
	renderHelper(target,res);
});

// router.get('/qrcode/:bid', function(req, res){
//   var qrcode = qr.image('http://thebright.in.th/check/'+req.params.bid, {type: 'png'});
//   var output = fs.createWriteStream('qrcode/'+req.params.bid+'.png');
//   res.type('png');
//   qrcode.pipe(res);
//   // qrcode.pipe(output);
//   // res.send("WORK");
//
// });

router.get('/qr-vip/:tbid', function(req, res){
  //Development
  // var qrcode = qr.image('http://localhost:3333/qr-vip/'+req.params.tbid, {type: 'png'});

  //Production
  var qrcode = qr.image('http://thebright.in.th/check/'+req.params.tbid, {type: 'png'});

  var output = fs.createWriteStream('public/qrcode/'+req.params.tbid+'.png');
  qrcode.pipe(output);

    Vip.findOne({thebright_id: req.params.tbid}, function(err,data){
        if(err) throw err;
        else res.render('qr-vip', {res:data});
    });
});



router.get('/check/:tbid', function(req, res){
  Vip.findOne({thebright_id: req.params.tbid}, function(err, data){
    if(err) throw err;
    else res.render('check', {res:data});
  });
});


function renderHelper(target,res){
	if(target == '')
		res.render('index');
	else
		res.render(target);
}

module.exports = router;
