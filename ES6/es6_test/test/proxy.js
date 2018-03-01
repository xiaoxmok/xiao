{
    let obj = {
        time: '2017-12-20',
        name: 'net',
        _r: 123
    }

    let monitor = new Proxy(obj, {
        get: function (target, key) {
            return target[key].replace('2017', '2018');
        },
        set: function (target, key, value) {
            if (target.key === 'name') {
                return target.key = value;
            } else {
                return target.key;
            }
        }
    });

    console.log('get', monitor.time);
    monitor.time = '2222';
    monitor.name = 'hello';
    console.log('set', monitor.time, monitor.name);
}