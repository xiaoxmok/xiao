var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/get', function(req, res, next) {
    //res.render(page, { title: 'Express2' });
    //res.send('hello world');
    //console.log('index22222');
    var data = [{a:'aa',b:'bb'},{a:'aa',b:'bb'},{a:'aa',b:'bb'},];
    res.json(data);
});

// get提交用户信息
router.get('/setInfo', function(req, res, next) {
    var response = {name: req.query.name, age: req.query.age};
    var data = {};
    if(response.name.length !== 0 || response.age.length !== 0){
      data.success = 200;
      data.err = '';
      data.data = [];
    }else{
        data.success = 1;
        data.err = 'name and age 不能为空';
        data.data = [];
    }

    //var data = [{a:'aa',b:'bb'},{a:'aa',b:'bb'},{a:'aa',b:'bb'},];
    res.json(data);
});

// post提交用户信息
router.post('/postInfo', function(req, res, next) {
    var response = {name: req.body.name, age: req.body.age};
    var data = {};
    if(response.name.length !== 0 || response.age.length !== 0){
        data.success = 200;
        data.err = '';
        data.data = [];
    }else{
        data.success = 1;
        data.err = 'name and age 不能为空';
        data.data = [];
    }

    //var data = [{a:'aa',b:'bb'},{a:'aa',b:'bb'},{a:'aa',b:'bb'},];
    res.json(data);
    //res.end(JSON.stringify(data));
});



module.exports = router;
