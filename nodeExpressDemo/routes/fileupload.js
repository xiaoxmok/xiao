var multer  = require('multer');

var storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: function (req, file, cb){
        cb(null, './public/img')
    },
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
        //var fileFormat =(file.originalname).split(".");
        //cb(null, file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1]);
        cb(null, file.originalname);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    //其他设置请参考multer的limits
    //limits:{}
});

//导出对象
module.exports = upload;


/*
https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md

multer是express官方推荐的文件上传中间件。

文件上传有以下方法
upload.single(‘file’), //适用于单文件上传。
upload.array(‘file’,num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num。
同时还提供了混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。

file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。

对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。*/
