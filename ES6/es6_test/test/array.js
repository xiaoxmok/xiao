{
    //方法用于将一组值，转换为数组。
    let arr = Array.of(1, 2, 3, 4, 5);
    console.log('arr=', arr);

    let empty = Array.of();
    console.log('empty=', empty);
}

{
    //把集合转成数组,Array.from方法用于将两类对象转为真正的数组
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    //es5的写法
    var arr1 = [].slice.call(arrayLike);
    console.log('es5', arr1);

    //es6的写法
    let arr2 = Array.from(arrayLike);
    console.log('Array.from', arr2);

    let arr3 = Array.from([1, 2, 3, 4, 5], item => item * 2);
    console.log('arr3:', arr3);
}

{
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach(function (item) {
        console.log(item.textContent);
    })
}

{
    //fill方法使用给定值，填充一个数组。
    console.log('fill', ['a', undefined, 2].fill(7));
    console.log('fill', ['a', undefined, 2, 3, 2, 3].fill(7, 3, 5));
}
{
    for (let index of ['1', 'c', 'ks'].keys()) {
        console.log("keys", index);
    }

    //需要开启兼容才能支持，import 'bebal-polyfill'
    /*for (let value of ['1', 'c', 'ks'].values()) {
        console.log('values', value);
    }*/

    for (let [index, value] of ['1', 'c', 'ks'].entries()) {
        console.log('entries', index, value);
    }

    //不使用for...of循环，使用next()方法
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value);
    console.log(entries.next().value);
    console.log(entries.next().value);
}

{
    console.log('copyWithin',[1,2,3,4,5,6,7,8].copyWithin(0,3,6));
}

{
    console.log('find',[1,2,3,4,5,6,7].find(item=>item>3));
    console.log('findIndex',[1,2,3,4,5,6,7].findIndex(item=>item>3));
}

{
    console.log('includes',[1,2,3].includes(1));
    console.log('includes',[1,2,3].includes(4));
    console.log('includes',[1,2,3,NaN].includes(NaN));
}









