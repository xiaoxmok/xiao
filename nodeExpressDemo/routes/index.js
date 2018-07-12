var express = require('express');
var router = express.Router();
var upload = require('./fileupload');

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render(page, { title: 'Express2' });
    res.send('hello world');
    //console.log('index22222');
});

router.get('/about', function (req, res, next) {
    //res.render(page, { title: 'Express2' });
    //res.send('hello world');
    //console.log('index22222');
    var data = [{a: 'aa', b: 'bb'}, {a: 'aa', b: 'bb'}, {a: 'aa', b: 'bb'},];
    res.json(data);
});

router.get('/goto', function (req, res, next) {
    console.log("Cookies: ", req.cookies)
    res.render('echarts', {title: 'Echarts'});
});

router.post('/upload_file',upload.single('file'), function (req, res, next) {
    var url = '/img/' + req.file.originalname;
    res.json({
        code : 200,
        url : url
    })

})

module.exports = router;
