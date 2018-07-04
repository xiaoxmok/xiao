{
    var obj = {
        count: 100,
        fn: function(){
            console.log(this.count);
        }
    }

    var getCount = obj.fn;
    getCount();
}

{
    var obj1 = {
        count: 100,
        fn: function(){
            console.log(fn);
        }
    }

    // console.log(obj1.fn());
}

{
    function A(name){
        this.name = name
    }

    A.prototype.sayName = function(){
        console.log(this.name);
    }

    function B(name){
        A.call(this,name)
    }

    var b = new B('china');

    // b.sayName();
}

{
    function loop(){
        for(var i=0;i<5;i++){
            (function(j){
                setTimeout(function(){
                    console.log(j);
                },1000)
            })(i)
        }
    }
    function loop(){
        for(var i=0;i<5;i++){
            setTimeout(function(){
                console.log(i);
            },1000)
        }
    }
    loop();
}