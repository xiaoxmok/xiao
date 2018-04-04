class Parent{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    // 静态方法
    static fu(){
        return 9;
    }
}
//静态属性，没有关键词，定义后直接使用
Parent.st = 'static';


class Child extends Parent{
    constructor(name,age){
        super(name);
        this.age = age;
    }
    getAge(){
        return this.age;
    }
}

let child = new Child('xiao',10);
console.log('name:',child.getName())
console.log('age:',child.getAge())

// 静态方法只能类调用，不能实例调用
console.log('static.fun:',Parent.fu());
// 静态属性直接用
console.log('static:',Parent.st);


