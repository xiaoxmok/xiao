'use strict';

{
    //参数的默认值
    var test = function test(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';

        console.log("默认值：", x, y);
    };

    test('hello');
    test('hello', 'china');
}

{
    var _test = function _test(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

        console.log("作用域：", x, y);
    };

    //作用域
    var x = 'test';

    _test();
    _test('hello');
}

{
    var _test2 = function _test2() {
        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                console.log('rest', v);
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
    };

    _test2(1, 2, 3, 4, 5, 'a');
}

{
    var _console, _console2;

    (_console = console).log.apply(_console, [1, 2, 3]);
    (_console2 = console).log.apply(_console2, ["a"].concat([1, 2, 3]));
}

{
    //箭头函数
    var arrow = function arrow(v) {
        return v * 2;
    };
    console.log('arrow():', arrow(3));

    var arrow2 = function arrow2() {
        return 5;
    };
    console.log(arrow2());

    var arrow3 = function arrow3() {
        console.log("arrow3");
    };
    arrow3();
}

{
    //伪调用，可提升性能，嵌套调用时
    var tail = function tail(x) {
        console.log("tail", x);
    };

    var fx = function fx(x) {
        return tail(x);
    };

    fx(123);
}