'use strict';

{
    // 异步，执行完A，再执行B，

    // es5的异步写法，使用回调函数
    var ajax = function ajax(callback) {
        console.log('开始');

        // 模拟2秒的通信请求
        setTimeout(function () {
            callback && callback.call();
        }, 2000);
    };

    ajax(function () {
        console.log('这是回调函数内容');
    });
}

// 当出现复杂情况，执行完A，再执行B，再执行C，再执行D，此时，写法比较复杂，可读性差，不易维护
// promise的出现就是解决这种问题。

{
    // resolve:执行下一步操作，也就是通信成功的操作
    // reject:中断操作，也就是失败的操作

    var _ajax = function _ajax() {
        console.log('promise-start');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
                // reject();
            }, 2000);
        });
    };

    _ajax().then(function () {
        console.log('promise-timeout,resolve');
    }, function () {
        console.log('promise-timeout,reject');
    });
}

{
    // 多步操作时,A=>B=>C
    var _ajax2 = function _ajax2() {
        console.log('promise-start，这是A');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
                // reject();
            }, 2000);
        });
    };

    _ajax2().then(function () {
        return new Promise(function (resolve, reject) {
            console.log('这是B');
            setTimeout(function () {
                resolve();
            }, 2000);
        });
    }).then(function () {
        console.log('这是C');
    });
}

{
    // 捕获错误
    var _ajax3 = function _ajax3(num) {
        return new Promise(function (resolve, reject) {
            if (num > 5) {
                resolve(num);
            } else {
                throw new Error('数字不能小于等于5');
            }
        });
    };

    _ajax3(6).then(function (num) {
        console.log('log', num);
    }).catch(function (err) {
        console.log('catch', err);
    });

    _ajax3(3).then(function (num) {
        console.log('log', num);
    }).catch(function (err) {
        console.log('catch', err);
    });
}

{
    // promise.all([]),加载图片示例，所有的图片加载完再添加到页面
    var loadImg = function loadImg(src) {
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.src = src;
            img.width = 200;
            img.height = 300;
            img.onload = function () {
                resolve(img);
            };

            img.onerror = function (err) {
                reject(err);
            };
        });
    };

    var showImg = function showImg(imgs) {
        imgs.forEach(function (img) {
            document.body.appendChild(img);
        });
    };

    Promise.all([loadImg('http://f2.dn.anqu.com/down/MmEyZg==/allimg/1311/54-131125093H9.jpg'), loadImg('http://down1.cnmo.com/cnmo-app/a216/ziranweimeifengjing1.jpg'), loadImg('http://img4.duitang.com/uploads/blog/201406/12/20140612035451_RriaU.jpeg')]).then(showImg);
}

{
    // 有一张图片加载完就添加到页面，先到先得，promise.race([])
    var _loadImg = function _loadImg(src) {
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.src = src;
            img.width = 200;
            img.height = 300;
            img.onload = function () {
                resolve(img);
            };

            img.onerror = function (err) {
                reject(err);
            };
        });
    };

    var _showImg = function _showImg(img) {
        var p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    };

    // race,有一个加载成功，则ok,


    Promise.race([_loadImg('http://f2.dn.anqu.com/down/MmEyZg==/allimg/1311/54-131125093H9.jpg'), _loadImg('http://down1.cnmo.com/cnmo-app/a216/ziranweimeifengjing1.jpg'), _loadImg('http://img4.duitang.com/uploads/blog/201406/12/20140612035451_RriaU.jpeg')]).then(_showImg);
}