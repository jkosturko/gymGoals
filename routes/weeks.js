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
//     db.weeks.find(function(err, weeks) {
//         if (err) console.log('Error finding weeks in db');
//         res.json(weeks);
//     });
// });

module.exports = router;
