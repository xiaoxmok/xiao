'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//变量的解构赋值
var a = 1,
    b = 2,
    c = 3;
var _ref = [],
    _ref$ = _ref[0],
    foo = _ref$ === undefined ? true : _ref$;

console.log(foo);

function f() {
    console.log("aaaa!");
}

var _ = 1,
    x = _ === undefined ? f() : _;


console.log(x, a, b, c);

var _hello = 'hello',
    _hello2 = _slicedToArray(_hello, 5),
    d = _hello2[0],
    e = _hello2[1],
    i = _hello2[2],
    g = _hello2[3],
    h = _hello2[4];

console.log(d, e, i, g, h);

var _hello3 = 'hello',
    len = _hello3.length;

console.log(len);