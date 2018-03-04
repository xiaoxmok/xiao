'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

{
    // 简洁的写法
    var o = 1;
    var k = 2;
    var es5 = {
        o: o,
        k: k
    };
    var es6 = {
        o: o,
        k: k
    };
    console.log(es5, es6);

    var es5_method = {
        hello: function hello() {
            console.log('es5_method');
        }
    };

    var es6_method = {
        hello: function hello() {
            console.log('hello es6_method');
        },
        world: function world() {
            console.log("world");
        }
    };
    es5_method.hello();
    es6_method.hello();
}

{
    var _es6_obj;

    // 属性表达式
    var a = 'b';
    var es5_obj = {
        a: 'c'
    };
    var es6_obj = (_es6_obj = {
        // []里是变量
        a: 'a'
    }, _defineProperty(_es6_obj, a, 'c'), _defineProperty(_es6_obj, 'c', 'c'), _es6_obj);
    console.log(es5_obj, es6_obj);
}

{
    // 新增API,
    // Object.is与===相同
    console.log("字符串", Object.is('abc', 'abc'));
    console.log('数组', Object.is([], []), [] === []);

    var _a = {
        a: 'a',
        b: 'b'
    };
    var b = {
        a: 'a',
        b: 'c',
        c: 'c'
        // assign(a,b) b对象拷贝到a对象中，组合新对象，不会拷贝继承的属性，同时不会拷贝不可枚举的属性
        //浅复制 ，引用类型时，只改变引用地址，而不是把值拷过去
    };var c = Object.assign(_a, b);
    console.log(c);

    var test = {
        k: 123,
        o: 456
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(test)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            console.log([key, value]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

{
    // 扩展运算符
    var _a$b$c$d = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' },
        _a2 = _a$b$c$d.a,
        _b = _a$b$c$d.b,
        _c = _objectWithoutProperties(_a$b$c$d, ['a', 'b']);

    console.log(_a2, _b, _c);
}