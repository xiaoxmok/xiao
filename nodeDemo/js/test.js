/**
 * Created by xiaoxiangmin on 2018/1/5.
 */

"use strict";


for(var i=1;i<=5;i++){
    (function(j){
        setTimeout(function(){
            console.log(j);
        },j*1000);
    })(i)
}