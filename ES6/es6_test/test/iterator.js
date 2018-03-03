{
    // iterator 遍历器

    let arr = ['hello', 'world'];
    let map = arr[Symbol.iterator]();
    console.log(map.next());
    console.log(map.next());
    console.log(map.next());
}

{
    // 自定义[Symbo.iterator](),使for..of遍历操作对象，则否for..of没法遍历对象
    let obj = {
        start: [1, 2, 3, 4],
        end: [6, 7, 8, 9],
        [Symbol.iterator]() {
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end);
            let len = arr.length;
            return {
                next() {
                    if (index < len) {
                        return {
                            value: arr[index++],
                            done: false
                        }
                    } else {
                        return {
                            value: arr[index++],
                            done: true
                        }
                    }
                }
            }
        }
    };

    for(let key of obj){
        console.log(key);
    }
}

{
    // for..of遍历数组
    let arr = ['hello', 'world'];
    for(let value of arr){
        console.log(value);
    }
}