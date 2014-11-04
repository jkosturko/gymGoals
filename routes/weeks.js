var express = require('express');
var router = express.Router();
var db = require('../database');


var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

/* GET weeks listing. */
router.get('/weeks/:id/data', function(req, res) {
	console.log('You are here with an id!!!')
	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
    db.weeks.findOne({"_id": weekId}, function(err, week) {
        if (err) console.log('Error finding weeks in db');
        console.log('GET WEEKS DATA')
        // res.json(week.data);
        res.json(week);
    });
});

//Not sure why this doesn't work
// /* Writing Week data to week page */
// router.get('/weeks/:id', function(req, res) {
// 	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
//     db.weeks.findOne({"_id": weekId}, function(err, week) {
//         if (err) console.log('Error finding weeks in db');
//         var data = JSON.stringify(week.data);
//         console.log('week', week.data);

// 		res.json(data);
// 	  	// res.render('week', { 
//   		// 	title: 'Per Week', 
//   		// 	weekData: data
//   		// });
//     });
// });

/* GET weeks listing. */
router.get('/', function(req, res) {
    db.weeks.find(function(err, weeks) {
        if (err) console.log('Error finding weeks in db');
        res.json(weeks);
    });
});

// /* GET weeks listing. */
// router.get('/weeks', function(req, res) {
//     db.weeks.find(function(err, weeks) {
//         if (err) console.log('Error finding weeks in db');
//         res.json(weeks);
//     });
// });


// When Post request is made to app, save
// json to database 
router.post('/', function(req, res) {
    db.weeks.save(req.body);
    res.send(req.body);
});

module.exports = router;















// module.exports = router;
