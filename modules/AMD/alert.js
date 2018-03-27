define(function () {
    var alertName = function (str) {
        console.log("I am " + str);
    };
    var alertAge = function (num) {
        console.log("I am " + num + " years old")
    };
    return {
        alertName:alertName,
        alertAge:alertAge
    }
})