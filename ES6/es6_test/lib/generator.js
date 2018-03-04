'use strict';

{
    // generator的基本定义
    var tell = /*#__PURE__*/regeneratorRuntime.mark(function tell() {
        return regeneratorRuntime.wrap(function tell$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return 'a';

                    case 2:
                        _context.next = 4;
                        return 'b';

                    case 4:
                        return _context.abrupt('return', 'c');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, tell, this);
    });

    var k = tell();
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());

    /*
    { value: 'a', done: false }
    { value: 'b', done: false }
    { value: 'c', done: true }
    { value: undefined, done: true }
    */
}

{
    // iterator和 generator 之间关系，此案例比iterator.js中的例子要简单的多。
    var obj = {};
    obj[Symbol.iterator] = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return 1;

                    case 2:
                        _context2.next = 4;
                        return 2;

                    case 4:
                        _context2.next = 6;
                        return 3;

                    case 6:
                        _context2.next = 8;
                        return 4;

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee, this);
    });
    /* let k = obj[Symbol.iterator]();
     console.log(k.next());
     console.log(k.next());
     console.log(k.next());
     console.log(k.next());*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            console.log(value);
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
    // generator最大的用处，状态机
    // A、B、C三种状态去描述一个事物，只有三种状态，A到B，B到C，C到A...，只在三种状态中。
    var state = /*#__PURE__*/regeneratorRuntime.mark(function state() {
        return regeneratorRuntime.wrap(function state$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!1) {
                            _context3.next = 9;
                            break;
                        }

                        _context3.next = 3;
                        return 'A';

                    case 3:
                        _context3.next = 5;
                        return 'B';

                    case 5:
                        _context3.next = 7;
                        return 'C';

                    case 7:
                        _context3.next = 0;
                        break;

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, state, this);
    });
    var states = state();
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());

    /*{ value: 'A', done: false }
    { value: 'B', done: false }
    { value: 'C', done: false }
    { value: 'A', done: false }
    { value: 'B', done: false }
    { value: 'C', done: false }
    { value: 'A', done: false }
    { value: 'B', done: false }
    { value: 'C', done: false }*/
}

{
    // async是generator的语法糖，作用同上，需要安装兼容库才能用
    /*let state =async function(){
        while(1){
            await 'A';
            await 'B';
            await 'C';
        }
    };
    let states = state();
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());
    console.log(states.next());*/
}

{
    // 抽奖例子，逻辑和次数分离开来
    var draw = function draw(count) {
        // 具体抽奖逻辑，未写
        /*...*/
        p.textContent = '\u8FD8\u5269' + count + '\u6B21';
        // console.log(`还剩${count}次`);
    };
    var residue = /*#__PURE__*/regeneratorRuntime.mark(function residue(count) {
        return regeneratorRuntime.wrap(function residue$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!(count > 0)) {
                            _context4.next = 6;
                            break;
                        }

                        count--;
                        _context4.next = 4;
                        return draw(count);

                    case 4:
                        _context4.next = 0;
                        break;

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, residue, this);
    });
    var star = residue(5);

    var btn = document.createElement('button');
    var p = document.createElement('p');
    p.id = 'p';
    btn.id = 'start';
    btn.textContent = '抽奖';
    document.body.appendChild(btn);
    document.body.appendChild(p);
    document.getElementById('start').addEventListener('click', function () {
        star.next();
    }, false);
}

{
    // 长轮询，不断的向服务器请求数据，直到成功为止；
    var ajax = /*#__PURE__*/regeneratorRuntime.mark(function ajax() {
        return regeneratorRuntime.wrap(function ajax$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return new Promise(function (resolve, reject) {
                            // 模拟请求耗时
                            setTimeout(function () {
                                resolve({ code: 0 });
                            }, 2000);
                        });

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, ajax, this);
    });

    var pull = function pull() {
        var generator = ajax();
        var step = generator.next();
        step.value.then(function (d) {
            if (d.code !== 0) {
                // 每隔一秒请求一次
                setTimeout(function () {
                    console.log('\u6B63\u5728\u8BF7\u6C42\u4E2D..');
                    pull();
                }, 1000);
            } else {
                console.log(d);
            }
        });
    };

    pull();
}