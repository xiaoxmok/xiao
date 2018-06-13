(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{157:function(t,a,e){"use strict";e.r(a);var n=e(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"ajax"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ajax","aria-hidden":"true"}},[t._v("#")]),t._v(" Ajax")]),e("ul",[e("li",[t._v("什么是 Ajax? 如何创建一个Ajax？")])]),e("ul",[e("li",[e("p",[t._v("AJAX(Asynchronous Javascript And XML) = 异步 JavaScript + XML 在后台与服务器进行异步数据交换，不用重载整个网页，实现局部刷新。")])]),e("li",[e("p",[t._v("创建 ajax 步骤：")]),e("ul",[e("li",[t._v("1.创建 XMLHttpRequest 对象")]),e("li",[t._v("2.创建一个新的 HTTP 请求，并指定该 HTTP 请求的类型、验证信息")]),e("li",[t._v("3.设置响应 HTTP 请求状态变化的回调函数")]),e("li",[t._v("4.发送 HTTP 请求")]),e("li",[t._v("5.获取异步调用返回的数据")]),e("li",[t._v("6.使用 JavaScript 和 DOM 实现局部刷新")])])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('var xhr = new XMLHttpRequest();\nxhr.open("POST", url, true);\nxhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");\nxhr.onreadystatechange = function () {\n    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {\n        fn.call(this, xhr.responseText);\n    }\n};\nxhr.send(data);\n')])])])])}],!1,null,null,null);a.default=r.exports}}]);