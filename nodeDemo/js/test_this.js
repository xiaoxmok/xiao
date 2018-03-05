//var name = 'aa';
var obj = {
    name: 'a',
    getName: function () {
        console.log(this.name);
    }
};
console.log('1');
var fn = obj.getName
console.log('2');
obj.getName();              // a
console.log('3');
var fn2 = obj.getName();     // a
console.log('4');
fn();                       // 空,undefined,this指向全局。
console.log('5');
fn2();                      // 报错，fn2 is not a function