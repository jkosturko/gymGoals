var mongojs = require('mongojs');
var db = mongojs('local', ['weeks']);

module.exports = db;

