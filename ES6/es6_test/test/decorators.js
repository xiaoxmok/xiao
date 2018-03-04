{
    // decorators 修改饰器，是一个函数，修改类的行为，也可以是扩展类的功能，只在类的范畴有用
    /**
     *
     * @param target:修改的类本身
     * @param name：修改了什么属性的名称
     * @param descriptor：该属性的描述对象
     */
    let readonly = function (target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    };

    class Test {
        @readonly
        time() {
            return '2018-3-3'
        }
    }

    let test = new Test();
    // 不能修改
    /*test.time=function(){
        return '33333'
    };*/
    console.log(test.time());
}

{
    let typename = function (target, name, descriptor) {
        target.myname = 'china';
    };

    @typename
    class Test {

    }

    console.log(Test.myname);


    // 第三方库修饰器的js库：core-decorators,也可以通过npm i core-decorators --save-dev 安装
}

{
    let log = (type) => {
        return function (target, name, descriptor) {
            let scr_method = descriptor.value;
            descriptor.value = (...arg) => {
                scr_method.apply(target, arg);
                console.log(`log ${type}`);
            }
        }
    };

    class AD {
        @log('show')
        show() {
            console.log('ad is show');
        }

        @log('click')
        click() {
            console.log('ad is click');
        }
    }

    let ad = new AD();
    ad.show();
    ad.click();
}
