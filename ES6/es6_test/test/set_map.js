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

    for (let key of list.keys()) {
        console.log('key', key);
    }
    for (let value of list.values()) {
        console.log('value', value);
    }
    for (let [key, value] of list.entries()) {
        console.log('entries', key, value);
    }

}

{
    // WeakSet,只能是对象，并且是弱引用，不受垃圾回收，不能遍历，
    let weakList = new WeakSet();

    let arg = {};
    weakList.add(arg);
    console.log('weakList', weakList);

}

{
    // map
    let map = new Map();
    let arr = ['123'];
    map.set(arr, 234);
    console.log('map', map, map.get(arr));
}

{
    // 第二种定义
    let map = new Map([['a', 123], ['b', 345]]);
    console.log('map', map);


    // 常用的属性值和方法
    console.log('size', map.size);
    console.log('delete', map.delete('a'), map);
    console.log('clear', map.clear(), map);


}

{
    let weakmap = new WeakMap();
    let o = {};
    weakmap.set(o, 123);
    console.log('weakmap', weakmap);
}

{
    // map与array的比较
    // 数据结构的横向对比，增，查，改，删
    let map = new Map();
    let array = []

    // 增
    map.set('t', 1);
    array.push({t: 1});

    console.info('map-array', map, array);

    // 查
    let map_exist = map.has('t');
    let array_exist = array.find(item => item.t);

    console.log(map_exist, array_exist);

    // 改
    map.set('t', 2);
    array.forEach(item => item.t ? item.t = 2 : '');
    console.info('map-array-modify', map, array);

    // 删
    map.delete('t');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info('map-array-delete', map, array);
}

{
    // set与array的比较
    let set = new Set();
    let array = [];

    // 增
    set.add({t: 1});
    array.push({t: 1});
    console.info('set-array-add', set, array);

    // 查
    let set_exist = set.has({t: 1});
    let array_exist = array.find(item => item.t);
    console.info('set-array-find', set, array);

    // 改
    set.forEach(item => item.t ? item.t = 2 : '');
    array.forEach(item => item.t ? item.t = 2 : '');
    console.info('set-array-modify', set, array);

    // 删
    set.forEach(item => item.t ? set.delete(item) : '');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info('set-array-delete', set, array);

}

{
    // map,set,object对比
    let item = {t: 1};
    let map = new Map();
    let set = new Set();
    let obj = {};

    // 增
    map.set('t', 1);
    set.add(item);
    obj['t'] = 1;

    console.log('map-set-obj', map, set, obj);

    // 查
    console.log({
        map_exist: map.has('t'),
        set_exist: set.has(item),
        obj_exist: 't' in obj
    });

    // 改
    map.set('t', 2);
    item.t = 2;   // set只修改引用
    obj['t'] = 2;
    //obj.t=3;
    console.log('map-set-obj-modify', map, set, obj);

    // 删
    map.delete('t');
    set.delete(item);
    delete obj.t;
    console.log('map-set-obj-delete', map, set, obj);
}

{
    // 建议：
    // 在整个开发过程中，数据结构，优先使用map，如果要求数据结构的唯一性，则使用set，尽量放弃使用array和obj
}
