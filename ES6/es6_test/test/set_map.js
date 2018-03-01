{
    let list = new Set();
    list.add(5);
    list.add(7);
    list.add(7);    // set中不能重复，重复的只算一个。
    console.log('size', list.size);
}

{
    let arr = [1, 2, 3, 4, 5, 6];
    let list = new Set(arr);
    console.log('arr', list.size);
}

{
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(1);
    console.log('list', list);

    // set()最大的作用去重
    let arr = [1, 2, 3, 4, 1, 2];
    let list2 = new Set(arr);
    console.log('过滤重复', list2);
}

{
    // set实例的方法，add(),delete(),clear(),has()

    let arr = ['add', 'delete', 'clear', 'has']
    let list = new Set(arr);
    console.log('has', list.has('add'));
    console.log('delete', list.delete('add'), list);
    list.clear();
    console.log('clear', list);
}

{
    // set实例的遍历
    let arr = ['add', 'delete', 'clear', 'has']
    let list = new Set(arr);

    for(let key of list.keys()){
        console.log('key',key);
    }
    for(let value of list.values()){
        console.log('value',value);
    }
    for(let [key,value] of list.entries()){
        console.log('entries',key,value);
    }

}

{
    // WeakSet,只能是对象，并且是弱引用，不受垃圾回收，不能遍历，
    let weakList = new WeakSet();

    let arg = {};
    weakList.add(arg);
    console.log('weakList',weakList);

}

{
    // map
    let map = new Map();
    let arr = ['123'];
    map.set(arr,234);
    console.log('map',map,map.get(arr));
}

{
    // 第二种定义
    let map = new Map([['a',123],['b',345]]);
    console.log('map',map);


    // 常用的属性值和方法
    console.log('size',map.size);
    console.log('delete',map.delete('a'),map);
    console.log('clear',map.clear(),map);


}

{
    let weakmap = new WeakMap();
    let o={};
    weakmap.set(o,123);
    console.log('weakmap',weakmap);
}

