{
    // symbol 创建独一无二的变量

    //声明
    let a1 = Symbol();
    console.log('typeof', typeof a1);

    let a2 = Symbol();
    console.log('a1===a2', a1 === a2);


    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3 === a4);
    console.log(a1, a2, a3, a4);
}

{
    // 作用
    let a1=Symbol.for('abc');
    let obj={           // 对象key值的不冲突
        [a1]:123,
        'abc':345,
        'c':566
    }
    console.log(obj);

    // for..of 中无法取到Symbol的值
    for(let [key,value] of Object.entries(obj)){
        console.log('for..of',[key,value]);
    }

    // 获取Symbol值
    Object.getOwnPropertySymbols(obj).forEach(function(item){
        console.log(item,obj[item]);
    })

    // 遍历对象属性，包括Symbol属性
    Reflect.ownKeys(obj).forEach(item=>{
        console.log('ownKeys',item,obj[item]);
    })
}