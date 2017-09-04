/**
 * Created by xiaoxiangmin on 2017/7/3.
 */
var fs=require('fs');

var pm25={
//写入文件
    fW:function(file,data){
        fs.writeFile(file,data,function(err){
            console.log('success!');
        });
    },

//删除文件
    fU:function(file){
        fs.unlink(file, function(){
            console.log('success');
        });
    },

//判断文件是否存在
    fE:function(file){
        fs.exists(file, function( exists ){
            if(exists){
                return true;
            }else{
                return false;
            }
        });
    },

    sol:function(){
        console.log("hello world!");
    }
};

//fW("../../data/dataPm.json","123456");
module.exports = pm25;