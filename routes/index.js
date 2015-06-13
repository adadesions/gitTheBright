var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

router.get('/home', function(req, res, next) {
  res.render('index');
});

router.get('/brochure', function(req, res, next) {
  res.render('brochure');
});

router.get('/about/:sec', function(req, res, next) {
	if(req.params.sec == 'knows')
		res.render('about/knows');
	else if(req.params.sec == 'why')
		res.render('about/why');
	else
		res.render('index');
});

module.exports = router;
