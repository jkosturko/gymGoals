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
	// var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
 //    db.weeks.findOne({"_id": weekId}, function(err, week) {
 //        if (err) console.log('Error finding weeks in db');
 //        var data = JSON.stringify(week.data);

 //        console.log('WEek View', data)
	// 	// res.json(data);
	//   	res.render('week', { 
 //  			title: 'Week View', 
 //  			appData: data
 //  		});

	db.weeks.find(function(err, weeks){
		var data = JSON.stringify(weeks);

	  	res.render('index', { 
  			title: 'Per Week', 
  			appData: data
  		});
	// });
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
router.get('/weeks/data/:id', function(req, res) {
	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
    db.weeks.findOne({"_id": weekId}, function(err, week) {
        if (err) console.log('Error finding weeks in db');
        res.json(week);
    });
});


//When I click a button, it updates the checked status
router.put('/weeks/data/:id', function(req, res) {
	var weekId = db.ObjectId(req.params.id);
	db.weeks.update({"_id": weekId}, {$set:{data:req.body.data}});
});

// When Post request is made to app, save
// json to database 
router.post('/weeks', function(req, res) {
    db.weeks.save(req.body);
    res.send(req.body);
});

module.exports = router;
