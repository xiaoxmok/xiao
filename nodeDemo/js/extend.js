/**
 * Created by xiaoxiangmin on 2018/1/22.
 */
/**
 * 显式混入
 * @param sourceOjb
 * @param targetObj
 * @returns {*}
 */
function mixin(sourceOjb, targetObj) {
    for (var key in sourceOjb) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceOjb[key];
        }
    }
    return targetObj;
};


function extend(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};

var Vehicle = {
    engines: 1,
    ignition: function () {
        console.log("Turning on my engine. " + this.engines);
    },
    drive: function () {
        this.ignition();
        console.log("Steering adn moving forward.");
    }
};

var Car = mixin(Vehicle, {
    wheels: 4,
    engines: 3,
    drive: function () {
        Vehicle.drive.call(this);
        console.log("Rolling on all " + this.engines + " wheels!")
    }
});


Car.drive();

var a = extend(Vehicle, Car);
console.log(Car);

console.log("-------------------------------\n");
/*
 ===============================================*/
/**
 * 寄生继承
 */
function v() {
    this.engines = 1;
}
v.prototype.ignition = function () {
    console.log("发动引擎！->"+this.engines);
};

v.prototype.drive = function () {
    this.ignition();
    console.log("手握方向盘！");
};

function c() {
    var car = new v();

    car.wheels = 3;

    var vehDrive = car.drive;

    car.drive = function(){
        vehDrive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    };
    //return car;
}

//var m = new c();
var m = c();
m.drive();