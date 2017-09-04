/**
 * Created by xiaoxm on 2017/4/24.
 */
var dns = require('dns');
var options = {all: true};

/*单个ip
function sreach(ip){
    dns.lookup(ip,function(err,address,family){
        if(err) throw err;
        console.log(ip+"的ip为："+JSON.stringify(address));
    });
};

//对应多个域名
function sreach1(ip){
    dns.lookup(ip,options,function(err,address,family){
        if(err) throw err;
        console.log(ip+"的ip为："+JSON.stringify(address));
    });
};

function sreach2(ip){
    dns.resolve4(ip,function(err,address){
        if(err) throw err;
        console.log(ip+"的ip为："+JSON.stringify(address))
    });
}*/

var s= {
    //单个ip
    sreach1:function(ip){
        dns.lookup(ip,function(err,address,family){
            if(err) throw err;
            console.log(ip+"的ip为："+JSON.stringify(address));
        });
    },
    //对应多个域名
    sreach2:function(ip){
        dns.lookup(ip,options,function(err,address,family){
            if(err) throw err;
            console.log(ip+"的ip为："+JSON.stringify(address));
        });
    },
    sreach3:function(ip){
        dns.resolve4(ip,function(err,address){
            if(err) throw err;
            console.log(ip+"的ip为："+JSON.stringify(address))
        });
    },
}

s.sreach3("www.k33366.com");