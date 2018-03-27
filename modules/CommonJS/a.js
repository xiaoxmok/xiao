var x = 5;
var addX = function (value) {
    return value + x;
}

/*
module.exports.x = x;
module.exports.addX = addX;
*/

module.exports = {
    x: x,
    addX: addX,
    addY: function (y) {
        return 'this is ' + y
    }
}

