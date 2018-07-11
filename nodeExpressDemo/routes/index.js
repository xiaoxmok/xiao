var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render(page, { title: 'Express2' });
    res.send('hello world');
    console.log('index');
});

module.exports = router;
