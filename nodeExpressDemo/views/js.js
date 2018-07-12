var bodyParser = require("body-parser");
//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/process_post', urlencodedParser, function (req, res) {
    response = {first_name: req.body.first_name,}
});
