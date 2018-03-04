'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
    //方法用于将一组值，转换为数组。
    var arr = Array.of(1, 2, 3, 4, 5);
    console.log('arr=', arr);

    var empty = Array.of();
    console.log('empty=', empty);
}

{
    //把集合转成数组,Array.from方法用于将两类对象转为真正的数组
    var arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    //es5的写法
    var arr1 = [].slice.call(arrayLike);
    console.log('es5', arr1);

    //es6的写法
    var arr2 = Array.from(arrayLike);
    console.log('Array.from', arr2);

    var arr3 = Array.from([1, 2, 3, 4, 5], function (item) {
        return item * 2;
    });
    console.log('arr3:', arr3);
}

{
    var p = document.querySelectorAll('p');
    var pArr = Array.from(p);
    pArr.forEach(function (item) {
        console.log(item.textContent);
    });
}

{
    //fill方法使用给定值，填充一个数组。
    console.log('fill', ['a', undefined, 2].fill(7));
    console.log('fill', ['a', undefined, 2, 3, 2, 3].fill(7, 3, 5));
}
{
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ['1', 'c', 'ks'].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var index = _step.value;

            console.log("keys", index);
        }

        //需要开启兼容才能支持，import 'bebal-polyfill'
        /*for (let value of ['1', 'c', 'ks'].values()) {
            console.log('values', value);
        }*/
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
        for (var _iterator2 = ['1', 'c', 'ks'].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                _index = _step2$value[0],
                value = _step2$value[1];

            console.log('entries', _index, value);
        }

        //不使用for...of循环，使用next()方法
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

    var letter = ['a', 'b', 'c'];
    var entries = letter.entries();
    console.log(entries.next().value);
    console.log(entries.next().value);
    console.log(entries.next().value);
}

{
    console.log('copyWithin', [1, 2, 3, 4, 5, 6, 7, 8].copyWithin(0, 3, 6));
}

{
    console.log('find', [1, 2, 3, 4, 5, 6, 7].find(function (item) {
        return item > 3;
    }));
    console.log('findIndex', [1, 2, 3, 4, 5, 6, 7].findIndex(function (item) {
        return item > 3;
    }));
}

{
    console.log('includes', [1, 2, 3].includes(1));
    console.log('includes', [1, 2, 3].includes(4));
    console.log('includes', [1, 2, 3, NaN].includes(NaN));
}