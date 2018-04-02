// 创建对象的方法

{
    // 1.对象字面量的方式
    var person = {
        firstName: 'Mark',
        lastName: 'jack',
        age: 24,
        eyeColor: 'black',
        eat: function () {
            console.log('eat')
        }
    }

    person.eat();
}
{
    // 2.构造函数 无参
    function Person() {
    }

    var person = new Person();
    person.name = 'mark';
    person.age = 25;
    person.work = function () {
        console.log(person.name + " hello")
    }
    person.work();
}
{
    // 3.构造函数 有参
    function Person(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.work = function () {
            console.log(this.name + " hello")
        }
    }

    var person = new Person('jack', 32, 'yellow'); // 实例化创建对象
    console.log(person.color);
    person.work();
}
{
    // 4.用工厂方式来创建
    var wcDog = new Object();
    wcDog.name = '旺财';
    wcDog.age = 3;
    wcDog.work = function () {
        console.log('this is a dog,name :' + wcDog.name)
    }
    wcDog.work();
}
{
    // 5.原型方式来创建
    function Dog() {
    }

    Dog.prototype.name = '小李子';
    Dog.prototype.age = 32;
    Dog.prototype.eat = function () {
        console.log(this.name + ' 吃的真多');
    };

    var wc = new Dog();
    wc.eat();
}
{
    // 6.混合方式，构造函数和原型方式的混合
    function Dog(name, price) {
        this.name = name;
        this.price = price;
    }

    Dog.prototype.sell = function () {
        console.log('this is Dog,name:' + this.name + ',price:' + this.price + '元');
    };

    var camry = new Dog('camry',23.32);
    camry.sell();
}
{
    // 其它，不相干

    var arr = [...new Set([1,2,3,2,4,23,342,3,2,3,2,32,3,23,2])]    // [...new Set()] ,将Set转成了数组
    // var arr = new Set([1,2,3,2,4,23,342,3,2,3,2,32,3,23,2])  // 这样写是一个set数据
    console.log(arr);


    console.log(['1','2','3'].map(parseInt));

    function num(n,a){
        return parseInt(n,a)
    }
    console.log([1,2,3,4,5].map(num));
}