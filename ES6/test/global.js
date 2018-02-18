

var fun1 = function(){
    var a = typeof window !== 'undefined'
        ? window : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
        ? global
        : this;
    console.log(a);
}

var getGlobal = function(){
    if(typeof self !== 'undefined'){
        console.log("self");
        return self;
    }
    if(typeof window !== 'undefined'){
        console.log("window");
        return window;
    }
    if(typeof global !== 'undefined'){
        console.log("global");
        return global;
    }
    throw new Error('unable to locate global object.');
};

getGlobal();
fun1();