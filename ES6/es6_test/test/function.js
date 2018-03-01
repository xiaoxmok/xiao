{
    //参数的默认值
    function test(x, y = 'world') {
        console.log("默认值：", x, y);
    }

    test('hello');
    test('hello', 'china')
}

{
    //作用域
    let x = 'test';

    function test(x, y = x) {
        console.log("作用域：", x, y);
    }

    test();
    test('hello');
}

{
    function test(...arg) {
        for (let v of arg) {
            console.log('rest', v);
        }
    }

    test(1, 2, 3, 4, 5, 'a');
}

{
    console.log(...[1, 2, 3]);
    console.log("a", ...[1, 2, 3]);
}

{
    //箭头函数
    let arrow = v => v * 2;
    console.log('arrow():', arrow(3));

    let arrow2 = () => 5;
    console.log(arrow2());

    let arrow3 = () =>{
        console.log("arrow3");
    };
    arrow3();
}

{
    //伪调用，可提升性能，嵌套调用时
    function tail(x) {
        console.log("tail", x);
    }

    function fx(x) {
        return tail(x);
    }
    fx(123);

}



