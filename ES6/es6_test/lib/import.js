'use strict';

var _export = require('./export');

console.log(_export.a);
(0, _export.test)();
var h = new _export.Hello();
h.test();

// nodeJs目前还不支持import语句，如果要使用，需要结合webpack。