'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
    var list = new Set();
    list.add(5);
    list.add(7);
    list.add(7); // set中不能重复，重复的只算一个。
    console.log('size', list.size);
}

{
    var arr = [1, 2, 3, 4, 5, 6];
    var _list = new Set(arr);
    console.log('arr', _list.size);
}

{
    var _list2 = new Set();
    _list2.add(1);
    _list2.add(2);
    _list2.add(1);
    console.log('list', _list2);

    // set()最大的作用去重
    var _arr = [1, 2, 3, 4, 1, 2];
    var list2 = new Set(_arr);
    console.log('过滤重复', list2);
}

{
    // set实例的方法，add(),delete(),clear(),has()

    var _arr2 = ['add', 'delete', 'clear', 'has'];
    var _list3 = new Set(_arr2);
    console.log('has', _list3.has('add'));
    console.log('delete', _list3.delete('add'), _list3);
    _list3.clear();
    console.log('clear', _list3);
}

{
    // set实例的遍历
    var _arr3 = ['add', 'delete', 'clear', 'has'];
    var _list4 = new Set(_arr3);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _list4.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            console.log('key', key);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _list4.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            console.log('value', value);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = _list4.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                _key = _step3$value[0],
                _value = _step3$value[1];

            console.log('entries', _key, _value);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}

{
    // WeakSet,只能是对象，并且是弱引用，不受垃圾回收，不能遍历，
    var weakList = new WeakSet();

    var arg = {};
    weakList.add(arg);
    console.log('weakList', weakList);
}

{
    // map
    var map = new Map();
    var _arr4 = ['123'];
    map.set(_arr4, 234);
    console.log('map', map, map.get(_arr4));
}

{
    // 第二种定义
    var _map = new Map([['a', 123], ['b', 345]]);
    console.log('map', _map);

    // 常用的属性值和方法
    console.log('size', _map.size);
    console.log('delete', _map.delete('a'), _map);
    console.log('clear', _map.clear(), _map);
}

{
    var weakmap = new WeakMap();
    var o = {};
    weakmap.set(o, 123);
    console.log('weakmap', weakmap);
}

{
    // map与array的比较
    // 数据结构的横向对比，增，查，改，删
    var _map2 = new Map();
    var array = [];

    // 增
    _map2.set('t', 1);
    array.push({ t: 1 });

    console.info('map-array', _map2, array);

    // 查
    var map_exist = _map2.has('t');
    var array_exist = array.find(function (item) {
        return item.t;
    });

    console.log(map_exist, array_exist);

    // 改
    _map2.set('t', 2);
    array.forEach(function (item) {
        return item.t ? item.t = 2 : '';
    });
    console.info('map-array-modify', _map2, array);

    // 删
    _map2.delete('t');
    var index = array.findIndex(function (item) {
        return item.t;
    });
    array.splice(index, 1);
    console.info('map-array-delete', _map2, array);
}

{
    // set与array的比较
    var set = new Set();
    var _array = [];

    // 增
    set.add({ t: 1 });
    _array.push({ t: 1 });
    console.info('set-array-add', set, _array);

    // 查
    var set_exist = set.has({ t: 1 });
    var _array_exist = _array.find(function (item) {
        return item.t;
    });
    console.info('set-array-find', set, _array);

    // 改
    set.forEach(function (item) {
        return item.t ? item.t = 2 : '';
    });
    _array.forEach(function (item) {
        return item.t ? item.t = 2 : '';
    });
    console.info('set-array-modify', set, _array);

    // 删
    set.forEach(function (item) {
        return item.t ? set.delete(item) : '';
    });
    var _index = _array.findIndex(function (item) {
        return item.t;
    });
    _array.splice(_index, 1);
    console.info('set-array-delete', set, _array);
}

{
    // map,set,object对比
    var item = { t: 1 };
    var _map3 = new Map();
    var _set = new Set();
    var obj = {};

    // 增
    _map3.set('t', 1);
    _set.add(item);
    obj['t'] = 1;

    console.log('map-set-obj', _map3, _set, obj);

    // 查
    console.log({
        map_exist: _map3.has('t'),
        set_exist: _set.has(item),
        obj_exist: 't' in obj
    });

    // 改
    _map3.set('t', 2);
    item.t = 2; // set只修改引用
    obj['t'] = 2;
    //obj.t=3;
    console.log('map-set-obj-modify', _map3, _set, obj);

    // 删
    _map3.delete('t');
    _set.delete(item);
    delete obj.t;
    console.log('map-set-obj-delete', _map3, _set, obj);
}

{
    // 建议：
    // 在整个开发过程中，数据结构，优先使用map，如果要求数据结构的唯一性，则使用set，尽量放弃使用array和obj
}