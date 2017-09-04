/**
 * Created by xiaoxiangmin on 2017/8/15.
 */

var a = {
    p:'张三',
    b:{
        m:function(){
            console.log(this.p);
        },
        p:'李四'
    }
};

a.b.m();

var hello = a.b;
hello.m();


