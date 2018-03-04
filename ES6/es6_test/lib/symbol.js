'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

{
    // symbol 创建独一无二的变量

    //声明
    var a1 = Symbol();
    console.log('typeof', typeof a1 === 'undefined' ? 'undefined' : _typeof(a1));

    var a2 = Symbol();
    console.log('a1===a2', a1 === a2);

    var a3 = Symbol.for('a3');
    var a4 = Symbol.for('a3');
    console.log(a3 === a4);
    console.log(a1, a2, a3, a4);
}

{
    var _obj;

    // 作用
    var _a = Symbol.for('abc');
    var obj = (_obj = {}, _defineProperty(_obj, _a, 123), _defineProperty(_obj, 'abc', 345), _defineProperty(_obj, 'c', 566), _obj);
    console.log(obj);

    // for..of 中无法取到Symbol的值
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            console.log('for..of', [key, value]);
        }

        // 获取Symbol值
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

    Object.getOwnPropertySymbols(obj).forEach(function (item) {
        console.log(item, obj[item]);
    });

    // 遍历对象属性，包括Symbol属性
    Reflect.ownKeys(obj).forEach(function (item) {
        console.log('ownKeys', item, obj[item]);
    });
}