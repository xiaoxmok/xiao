'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    var obj = {
        time: '2017-12-20',
        name: 'net',
        _r: 123
    };

    var monitor = new Proxy(obj, {
        // 拦截读取属性
        get: function get(target, key) {
            if (target[key]) {
                return target[key].replace('2017', '2018');
            }
        },
        // 拦截设置属性
        set: function set(target, key, value) {
            if (target.key === 'name') {
                return target.key = value;
            } else {
                return target.key;
            }
        },
        // 拦截key in object操作
        has: function has(target, key) {
            if (key === 'name') {
                return target[key];
            } else {
                return false;
            }
        },

        // 拦截delete
        deleteProperty: function deleteProperty(target, key) {
            if (key.indexOf('_') > -1) {
                delete target[key];
                return true;
            } else {
                return target[key];
            }
        },

        // 拦截Object.keys,Object.getOwnPropertySymbol,Object.getOwnPropertyNames
        ownKeys: function ownKeys(target) {
            return Object.keys(target).filter(function (item) {
                return item != 'time';
            });
        }
    });

    console.log('get', monitor.time);
    monitor.time = '2222';
    monitor.name = 'hello';
    console.log('set', monitor.time, monitor.name);
    console.log('has', 'name' in monitor, 'time' in monitor);
    // delete monitor.name;
    // delete monitor._r;
    console.log('delete', monitor);
    console.log('ownKey', Object.keys(monitor));
}

{
    var _obj = {
        time: '2017-12-20',
        name: 'net',
        _r: 123
    };

    console.log('Reflect get', Reflect.get(_obj, 'time'));
    Reflect.set(_obj, 'name', 'china');
    console.log(_obj);
    console.log('Reflect has', Reflect.has(_obj, 'time'));
}

{
    // 实战

    // 公用的拦截器，只需要修改构造函数和验证条件，条件和对象本身完全隔离开
    var validator = function validator(target, _validator) {
        return new Proxy(target, {
            _validator: _validator,
            set: function set(target, key, value, proxy) {
                if (target.hasOwnProperty(key)) {
                    var va = this._validator[key];
                    // console.log(!!va(value),key,value,);
                    if (va(value)) {
                        return Reflect.set(target, key, value, proxy);
                    } else {
                        throw Error('\u4E0D\u80FD\u8BBE\u7F6E' + key + '\u5230' + value);
                    }
                } else {
                    throw Error(key + '\u4E0D\u5B58\u5728');
                }
            }
        });
    };

    var personValidator = {
        name: function name(val) {
            return typeof val === 'string';
        },
        age: function age(val) {
            return typeof val === 'number' && val > 18;
        },
        mobile: function mobile(val) {}
    };

    var Person = function Person(name, age) {
        _classCallCheck(this, Person);

        this.name = name;
        this.age = age;
        this.mobile = '12312';
        return validator(this, personValidator);
    };

    var person = new Person('lilei', 30);

    console.log('person', person);
    person.age = 19;
    person.name = 'han mei mei';
    console.log('person', person);
}