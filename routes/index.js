var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res) {
	db.weeks.find(function(err, weeks){
		var data = JSON.stringify(weeks);

	  	res.render('index', { 
  			title: 'Per Week', 
  			appData: data
  		});
	});
});


/* Writing Week data to week page */
router.get('/weeks/:id', function(req, res) {
	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
    db.weeks.findOne({"_id": weekId}, function(err, week) {
        if (err) console.log('Error finding weeks in db');
        var data = JSON.stringify(week.data);

		// res.json(data);
	  	res.render('week', { 
  			title: 'Week View', 
  			appData: data
  		});
    });



	// db.weeks.find(function(err, weeks){
	// 	var data = JSON.stringify(weeks);

	//   	res.render('week', { 
 //  			title: 'Per Week', 
 //  			appData: data
 //  		});
	// });


});

// // No idea why I can't move these week tags into weeks.js

/* GET weeks listing. */
router.get('/weeks', function(req, res) {
    db.weeks.find(function(err, weeks) {
        if (err) console.log('Error finding weeks in db');
        res.json(weeks);
    });
});


// /* Writing Week data to week page */
// router.get('/weeks/:id', function(req, res) {
// 	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
//     db.weeks.findOne({"_id": weekId}, function(err, week) {
//         if (err) console.log('Error finding weeks in db');
//         var data = JSON.stringify(week.data);

// 		// res.json(data);
// 	  	res.render('week', { 
//   			title: 'Per Week', 
//   			appData: data
//   		});
//     });
// });


/* GET weeks listing. */
router.get('/weeks/:id/data', function(req, res) {
	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
    db.weeks.findOne({"_id": weekId}, function(err, week) {
        if (err) console.log('Error finding weeks in db');
        res.json(week.data);
    });
});


module.exports = router;
