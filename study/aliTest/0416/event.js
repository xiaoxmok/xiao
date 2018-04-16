// 事件监听

event = {
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler
        }
    },
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.datachEvent) {
            element.datachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    stopPropagation: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        // e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    },
    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        // e.preventDefault ? e.preventDefault() : e.returnValue = false;
    },
    // 获取事件目标
    getTarget: function (e) {
        return e.target || e.srcElement;
    },
    getEvent: function (e) {
        return e ? e : window.event;
    }
}

// 判断对象是否数组
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}

// 冒泡排序，每次比较相邻的两个数，如果后一个比前一个小，换位置
var arr = [10, 3, 2, 5, 3, 2, 8, 4, 9, 1, 3];

function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort(arr));

// 求字符串长度，英文一个，中文两个
function getBytes(str){
    var len = str.length;
    var bytes = len;
    for(var i=0;i<len;i++){
        if(str.charCodeAt(i)>255){
            bytes++;
        }
    }
    return bytes;
}

console.log(getBytes('您好啊,ss'));