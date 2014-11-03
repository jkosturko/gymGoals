var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res) {
	db.weeks.find(function(err, weeks){
		var data = JSON.stringify(weeks);
		console.log('data', data);
	  	res.render('index', { 
  			title: 'Per Week', 
  			appData: data
  		});
	});
});

module.exports = router;
