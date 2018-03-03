{
    // generator的基本定义
    let tell = function* () {
        yield 'a';
        yield 'b';
        return 'c';         // 在执行return的时候，会返回第一个yield，依次第二个
    };

    let k = tell();
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
    let obj = {};
    obj[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    };
    /* let k = obj[Symbol.iterator]();
     console.log(k.next());
     console.log(k.next());
     console.log(k.next());
     console.log(k.next());*/
    for (let value of obj) {
        console.log(value);
    }

}

{
    // generator最大的用处，状态机
    // A、B、C三种状态去描述一个事物，只有三种状态，A到B，B到C，C到A...，只在三种状态中。
    let state = function* () {
        // while不断的循环
        while (1) {
            yield 'A';
            yield 'B';
            yield 'C';
        }
    };
    let states = state();
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
    let draw = function (count) {
        // 具体抽奖逻辑，未写
        /*...*/
        p.textContent = `还剩${count}次`;
        // console.log(`还剩${count}次`);
    };
    let residue = function* (count) {
        while (count > 0) {
            count--;
            yield draw(count);
        }
    };
    let star = residue(5);

    let btn = document.createElement('button');
    let p = document.createElement('p');
    p.id = 'p';
    btn.id = 'start';
    btn.textContent = '抽奖';
    document.body.appendChild(btn);
    document.body.appendChild(p);
    document.getElementById('start').addEventListener('click', function () {
        star.next();
    }, false)

}

{
    // 长轮询，不断的向服务器请求数据，直到成功为止；
    let ajax = function* () {
        yield new Promise((resolve, reject) => {
            // 模拟请求耗时
            setTimeout(() => {
                resolve({code: 0});
            }, 2000)
        })
    };

    let pull = function () {
        let generator = ajax();
        let step = generator.next();
        step.value.then((d) => {
            if (d.code !== 0) {
                // 每隔一秒请求一次
                setTimeout(function(){
                    console.log(`正在请求中..`);
                    pull();
                },1000)
            }else{
                console.log(d);
            }
        })
    };

    pull();

}


