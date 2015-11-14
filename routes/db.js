var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Student = require('../models/student.js');
var Paid = require('../models/paid.js');
var Vip = require('../models/vip.js');
var Check = require('../models/check.js');


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res, next) {
	var newStudent = Student({
		course : req.body.course,
		id_card : req.body.id_card,
		prefix : req.body.prefix,
		full_name: req.body.full_name,
		birthday: req.body.birthday,
		school: req.body.schoolname,
		level: req.body.class,
		major: req.body.program,
		address: req.body.address,
		mobile: req.body.mobile,
		email: req.body.email,
		facebook_account: req.body.facebook,
		line_account: req.body.line,
		parents_name: req.body.parents,
		parents_relationship: req.body.parents_relationship,
		parents_number: req.body.parents_number,
	});

	newStudent.save(function(err) {
		if(err)
			res.redirect('/error');
		else
			res.redirect('/home');
	});
});

router.post('/paid', function(req, res, next) {
  var prefix = "HYEX";
  var init_id = 121500;

  Paid.find({}, function(err, data){
    var id = data.length - 1;
  	var newPaid = Paid({
  		course: req.body.course,
      thebright_id: prefix+(init_id+id),
  		channel: req.body.channel,
  		paid_datetime: req.body.paid_datetime,
  		amount: req.body.amount,
  		full_name: req.body.full_name,
  		school: req.body.schoolname,
  		email: req.body.email,
  		tel: req.body.tel,
  		detail: req.body.detail,
  		transfer_slip: req.files.transfer_slip.path
  	});

  	newPaid.slipPath();

  	console.log(newPaid);
  	newPaid.save(function(err){
  		if(err)
  			res.redirect('/error');
  		else
  			res.redirect('/paid-complete');
  	});
  });
});

router.post('/checkin', function(req, res){
  var m_code = "thebrighthatyai99";
  var c_code = req.body.code;
  var tbid = req.body.tbid;
  if(m_code == c_code){
    Vip.findOne({thebright_id:tbid}, function(err,data){
        var newCheck = Check({
          thebright_id: data.theBrught_id,
          amount: data.amount,
          full_name: data.full_name,
          school: data.school,
          email: data.email,
          tel: data.tel
        });
        newCheck.save(function(err){
          if(err) res.redirect('/error');
          else res.send('Completed go back to <a href="http://thebright.in.th"> TheBright')
        });

    });
  }
  else
    res.send('C_code: '+c_code);
});

router.get('/reports', function(req, res, next) {
	res.render('reports/report-main');
});

router.get('/reports/:rep', function(req, res, next) {
	rep = req.params.rep
	target = 'reports/'+rep

	if(rep == 'report-student'){
		var paid_index = [];

		Student.find({}).sort('_id').exec(function(err, students){
			Paid.find({}).sort('_id').exec(function(err, paids){
			for(var i in students){
				for(var k in paids){
					if(students[i].full_name == paids[k].full_name)
						paid_index.push(i);
				}
			}
			console.log(_.uniq(paid_index));
			res.render(target, {records:students, paids_index:_.uniq(paid_index)});
			});
		});


	}
	else if(rep == 'report-paid'){
		Paid.find({}).sort('_id').exec(function(err, paids){
			res.render(target, {records:paids});
		})
	}
  else if(rep == 'report-checkin'){
    Check.find({}).sort('thebright_id').exec(function(err, data){
      res.render(target, {records:data})
    })
  }
});

router.get('/api/paids', function(req, res){
  Paid.find({}).sort('thebright_id').exec(function(err, data){
    res.json(data);
  });
});

router.get('/api/vip', function(req, res){
  Vip.find({}).exec(function(err, data){
      res.json(data);
  });
});

router.get('/api/vip/:tbid', function(req, res){
    Vip.find({thebright_id: req.params.tbid}, function(err,data){
        if(err) throw err;
        else{
          Paid.find({email: data[0].email}, function(err,data1){
             if(err) throw err;
             else res.json(data1);
          });
        }
    });
});

router.get('/datafix/wrongpath', function(req, res){
	Paid.find({transfer_slip:/.*right.*/}, function(err,data){
		for(i in data){
			data[i].transfer_slip = data[i].transfer_slip.substring(13);
			data[i].save();
		}
		res.json(data);
	});
});

router.get('/datafix/runid', function(req, res){
  var prefix = 'HYEX';
  var id = 121500;
  Paid.find({}, function(err, data){
    if(err) return err
    else{
      for(var i in data){
        data[i].thebright_id = prefix+id;
        data[i].save();
        id++;
      }
    }
    console.log(data.length);
    res.json(data);
  })
});

module.exports = router;
