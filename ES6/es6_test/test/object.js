{
    // 简洁的写法
    let o = 1;
    let k = 2;
    let es5 = {
        o: o,
        k: k
    };
    let es6 = {
        o,
        k
    };
    console.log(es5, es6)

    let es5_method = {
        hello: function () {
            console.log('es5_method');
        }
    };

    let es6_method = {
        hello() {
            console.log('hello es6_method');
        },
        world() {
            console.log("world");
        }
    };
    es5_method.hello();
    es6_method.hello();
}

{
    // 属性表达式
    let a = 'b';
    let es5_obj = {
        a: 'c'
    };
    let es6_obj = {
        // []里是变量
        a: 'a',
        [a]: 'c',
        c: 'c'

    };
    console.log(es5_obj, es6_obj)
}

{
    // 新增API,
    // Object.is与===相同
    console.log("字符串", Object.is('abc', 'abc'));
    console.log('数组', Object.is([], []), [] === []);

    let a = {
        a: 'a',
        b: 'b'
    }
    let b = {
        a: 'a',
        b: 'c',
        c: 'c'
    }
    // assign(a,b) b对象拷贝到a对象中，组合新对象，不会拷贝继承的属性，同时不会拷贝不可枚举的属性
    //浅复制 ，引用类型时，只改变引用地址，而不是把值拷过去
    let c = Object.assign(a, b);
    console.log(c);

    let test = {
        k: 123,
        o: 456
    }
    for (let [key, value] of Object.entries(test)) {
        console.log([key, value]);
    }

}

{
    // 扩展运算符
    let {a, b, ...c} = {a: 'aa', b: 'bb', c: 'cc', d: 'dd'};
    console.log(a, b, c);
}

