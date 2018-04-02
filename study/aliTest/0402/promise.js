{
    var promise = new Promise(function(resolve,reject){
        if(success){
            resolve(result);
        }else{
            reject(Error);
        }
    })

    promise.then(function(resolve){
        // 成功的处理，resolve作为参数
    },function(reject){
        // 失败的处理，reject作为参数
    })
}