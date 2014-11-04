var express = require('express');
var router = express.Router();
var db = require('../database');

// When Post request is made to app, save
// json to database 
// router.post('/', function(req, res) {
//     db.weeks.save(req.body);
//     res.send(req.body);
// });

// /* GET weeks listing. */
// router.get('/weeks', function(req, res) {
// 	var weekId = db.ObjectId(req.params.id);  //video 3? Rewatch
//     db.weeks.findOne({"_id": weekId}, function(err, week) {
//         if (err) console.log('Error finding weeks in db');
//         res.json(week);
//     });
// });

module.exports = router;
