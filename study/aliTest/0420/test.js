{
    // 输出今天星期几

    var days = ['日', '一', '二', '三', '四', '五', '六']
    var date = new Date();

    console.log('今天星期' + days[date.getDay()]);
}
{
    // 循环输出0 1 2 3 4
    for (var i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log(i + ' ')
        }, 100)
    }

    for (var i = 0; i < 5; i++) {
        (function (i) {
            setTimeout(function () {
                console.log(i + ' ')
            }, 100)
        })(i)
    }
}
{
    function Page() {
    }

    Page.prototype = {
        constructor: Page,

        postA: function (a) {
            console.log('a:' + a);
        },
        postB: function (b) {
            console.log('b:' + b);
        },
        postC: function (c) {
            console.log('c:' + c);
        },
        check: function () {
            return Math.random() > 0.5;
        }
    }

    function checkfy(obj) {
        for (var key in obj) {
            if (key.indexOf('post') === 0 && typeof obj[key] === 'function') {
                (function (key) {
                    var fn = obj[key];
                    obj[key] = function () {
                        if (obj.check()) {
                            fn.apply(obj, arguments);
                        }
                    };
                }(key));
            }
        }
    } // end checkfy()

    checkfy(Page.prototype);

    var obj = new Page();

    obj.postA('checkfy');
    obj.postB('checkfy');
    obj.postC('checkfy');
}