
const express = require('express');
const pugIndex = require('../views/index.pug');
const utility = require('../lib/utility');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	return utility.renderPugTemplate(res, pugIndex, { title: 'Express' });
});

router.get('/fail', function(req, res, next) {
	throw new Error('*** FAILURE TEST ROUTE ***');
});

module.exports = router;
