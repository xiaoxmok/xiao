{
    // 基本定义和生成实例
    class Person {
        // 构造函数
        constructor(name = 'china') {
            this.name = name;
        }
    }

    let v_parent = new Person('哈哈');
    console.log('构造函数', v_parent);
}

{
    // 继承
    class Person {
        constructor(name = 'china') {
            this.name = name;
        }
    }

    class Child extends Person {

    }

    console.log('extends', new Child());
}

{
    // 继承传递参数
    class Person {
        constructor(name = 'china') {
            this.name = name;
        }
    }

    class Child extends Person {
        constructor(name = 'child') {
            super(name);            // 传递父类的参数
            this.type = 'child';    // 子类自己的参数，一定要放在super之后，子类中使用了super，super必须在第一行
        }
    }

    console.log('extends', new Child());
}

{
    // getter,setter
    class Person {
        constructor(name = 'china') {
            this.name = name;
        }

        get longName() {
            return 'china ' + this.name;
        }

        set longName(value) {
            return this.name = value;
        }
    }

    let v = new Person();
    console.log('getter', v.longName);
    v.longName = 'american';
    console.log('setter', v.longName);
}

{
    // 静态方法，静态方法能只用类调用，不能用类的实例调用
    class Person {
        constructor(name = 'china') {
            this.name = name;
        }

        static tell() {
            console.log('这是静态方法');
        }
    }

    Person.tell();

}

{
    // 静态属性
    class Person {
        constructor(name = 'china') {
            this.name = name;
        }

        static tell() {
            console.log('这是静态方法');
        }
    }

    // 静态属性没有关键词，在类定义完后，直接定义，读取时直接使用类调用
    Person.china = 'china';
    console.log('静态属性', Person.china);
}