/**
 * Created by xiaoxiangmin on 2018/1/5.
 */

"use strict";


var obj = {
    id:'awesome',
    cool:function coolFn(){
        console.log(this.id);
    }
};

var id = 'not awesome';

obj.cool();

setTimeout(obj.cool,100);