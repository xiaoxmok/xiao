'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

{
    var _desc, _value, _class;

    // decorators 修改饰器，是一个函数，修改类的行为，也可以是扩展类的功能，只在类的范畴有用
    /**
     *
     * @param target:修改的类本身
     * @param name：修改了什么属性的名称
     * @param descriptor：该属性的描述对象
     */
    var readonly = function readonly(target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    };

    var Test = (_class = function () {
        function Test() {
            _classCallCheck(this, Test);
        }

        _createClass(Test, [{
            key: 'time',
            value: function time() {
                return '2018-3-3';
            }
        }]);

        return Test;
    }(), (_applyDecoratedDescriptor(_class.prototype, 'time', [readonly], Object.getOwnPropertyDescriptor(_class.prototype, 'time'), _class.prototype)), _class);


    var test = new Test();
    // 不能修改
    /*test.time=function(){
        return '33333'
    };*/
    console.log(test.time());
}

{
    var _class2;

    var typename = function typename(target, name, descriptor) {
        target.myname = 'china';
    };

    var _Test = typename(_class2 = function _Test() {
        _classCallCheck(this, _Test);
    }) || _class2;

    console.log(_Test.myname);

    // 第三方库修饰器的js库：core-decorators,也可以通过npm i core-decorators --save-dev 安装
}

{
    var _dec, _dec2, _desc2, _value2, _class3;

    var log = function log(type) {
        return function (target, name, descriptor) {
            var scr_method = descriptor.value;
            descriptor.value = function () {
                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                    arg[_key] = arguments[_key];
                }

                scr_method.apply(target, arg);
                console.log('log ' + type);
            };
        };
    };

    var AD = (_dec = log('show'), _dec2 = log('click'), (_class3 = function () {
        function AD() {
            _classCallCheck(this, AD);
        }

        _createClass(AD, [{
            key: 'show',
            value: function show() {
                console.log('ad is show');
            }
        }, {
            key: 'click',
            value: function click() {
                console.log('ad is click');
            }
        }]);

        return AD;
    }(), (_applyDecoratedDescriptor(_class3.prototype, 'show', [_dec], Object.getOwnPropertyDescriptor(_class3.prototype, 'show'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'click', [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, 'click'), _class3.prototype)), _class3));


    var ad = new AD();
    ad.show();
    ad.click();
}