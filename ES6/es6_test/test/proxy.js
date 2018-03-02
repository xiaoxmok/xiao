{
    let obj = {
        time: '2017-12-20',
        name: 'net',
        _r: 123
    }

    let monitor = new Proxy(obj, {
        // 拦截读取属性
        get: function (target, key) {
            if(target[key]){
                return target[key].replace('2017', '2018');
            }
        },
        // 拦截设置属性
        set: function (target, key, value) {
            if (target.key === 'name') {
                return target.key = value;
            } else {
                return target.key;
            }
        },
        // 拦截key in object操作
        has(target, key) {
            if (key === 'name') {
                return target[key];
            } else {
                return false;
            }
        },
        // 拦截delete
        deleteProperty(target,key){
            if(key.indexOf('_')>-1){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        // 拦截Object.keys,Object.getOwnPropertySymbol,Object.getOwnPropertyNames
        ownKeys(target){
            return Object.keys(target).filter(item=>item!='time');
        }
    });

    console.log('get', monitor.time);
    monitor.time = '2222';
    monitor.name = 'hello';
    console.log('set', monitor.time, monitor.name);
    console.log('has', 'name' in monitor,'time' in monitor);
    // delete monitor.name;
    // delete monitor._r;
    console.log('delete', monitor);
    console.log('ownKey', Object.keys(monitor));
}

{
    let obj = {
        time: '2017-12-20',
        name: 'net',
        _r: 123
    };

    console.log('Reflect get',Reflect.get(obj,'time'));
    Reflect.set(obj,'name','china');
    console.log(obj);
    console.log('Reflect has',Reflect.has(obj,'time'));
}


