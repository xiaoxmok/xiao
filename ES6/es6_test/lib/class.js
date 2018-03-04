'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    // 基本定义和生成实例
    var Person =
    // 构造函数
    function Person() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

        _classCallCheck(this, Person);

        this.name = name;
    };

    var v_parent = new Person('哈哈');
    console.log('构造函数', v_parent);
}

{
    // 继承
    var _Person = function _Person() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

        _classCallCheck(this, _Person);

        this.name = name;
    };

    var Child = function (_Person2) {
        _inherits(Child, _Person2);

        function Child() {
            _classCallCheck(this, Child);

            return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
        }

        return Child;
    }(_Person);

    console.log('extends', new Child());
}

{
    // 继承传递参数
    var _Person3 = function _Person3() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

        _classCallCheck(this, _Person3);

        this.name = name;
    };

    var _Child = function (_Person4) {
        _inherits(_Child, _Person4);

        function _Child() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'child';

            _classCallCheck(this, _Child);

            // 传递父类的参数
            var _this2 = _possibleConstructorReturn(this, (_Child.__proto__ || Object.getPrototypeOf(_Child)).call(this, name));

            _this2.type = 'child'; // 子类自己的参数，一定要放在super之后，子类中使用了super，super必须在第一行
            return _this2;
        }

        return _Child;
    }(_Person3);

    console.log('extends', new _Child());
}

{
    // getter,setter
    var _Person5 = function () {
        function _Person5() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

            _classCallCheck(this, _Person5);

            this.name = name;
        }

        _createClass(_Person5, [{
            key: 'longName',
            get: function get() {
                return 'china ' + this.name;
            },
            set: function set(value) {
                return this.name = value;
            }
        }]);

        return _Person5;
    }();

    var v = new _Person5();
    console.log('getter', v.longName);
    v.longName = 'american';
    console.log('setter', v.longName);
}

{
    // 静态方法，静态方法能只用类调用，不能用类的实例调用
    var _Person6 = function () {
        function _Person6() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

            _classCallCheck(this, _Person6);

            this.name = name;
        }

        _createClass(_Person6, null, [{
            key: 'tell',
            value: function tell() {
                console.log('这是静态方法');
            }
        }]);

        return _Person6;
    }();

    _Person6.tell();
}

{
    // 静态属性
    var _Person7 = function () {
        function _Person7() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'china';

            _classCallCheck(this, _Person7);

            this.name = name;
        }

        _createClass(_Person7, null, [{
            key: 'tell',
            value: function tell() {
                console.log('这是静态方法');
            }
        }]);

        return _Person7;
    }();

    // 静态属性没有关键词，在类定义完后，直接定义，读取时直接使用类调用


    _Person7.china = 'china';
    console.log('静态属性', _Person7.china);
}