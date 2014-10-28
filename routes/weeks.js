var express = require('express');
var router = express.Router();
var db = require('../database');
// var bodyParser = require('body-parser');

router.post('/', function(req, res) {
    console.log('req.body', req.body);
    db.weeks.save(req.body);

    //stop post some how
});

/* GET users listing. */
router.get('/', function(req, res) {
    db.weeks.find(function(err, weeks) {
        if (err)
            console.log('Error finding weeks in db');

        res.json(weeks);
    });
});

module.exports = router;
