/**
 * Created by xiaoxm on 2017/12/17.
 */

/*

 Number类型：
 Number类型是ECMAScript中最常用和最令人关注的类型了；这种类型使用IEEE754格式来表示整数和浮点数值（浮点数值在某些语言中也被成为双精度数值），为支持各种数据类型，ECMA-262定义了不同的数值面量格式。
 十进制：
 var intNum=10; //整数
 八进制:
 var octalNum1=070; //八进制的56
 var octalNum2=079; //无效的八进制数值-解析为79
 八进制字面量在严格模式下是无效的；
 十六进制：
 var hexNum1=0xA; //10
 切记：在进行运算的时候，所有以八进制和十六进制表示的数值都最终被转换成十进制；
 为什么操作小数会出现误差？
 浮点数值的最高进度是17位小数，但在进行运算的时候其精确度却远远不如整数；整数在进行运算的时候都会转成10进制；
 而Java和JavaScript中计算小数运算时，都会先将十进制的小数换算到对应的二进制，一部分小数并不能完整的换算为二进制，
 这里就出现了第一次的误差。待小数都换算为二进制后，再进行二进制间的运算，得到二进制结果。然后再将二进制结果换算为十进制，
 这里通常会出现第二次的误差。
 所以(0.1+0.2)!=03
 */


/**
 * 解决加法精度问题
 * 保留两位小数
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accAdd(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m + arg2 * m) / m).toFixed(n))
}

Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};


/**
 * 解决除法精度问题
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

/**
 * 解决乘法精度问题
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m
        )
}

Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

/**
 * 解决减法精度问题
 * 保留两位小数
 * @param arg2
 * @param arg1
 * @returns {number}
 */
function accSubtr(arg2, arg1) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
//动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};

Number.prototype.subtr = function (arg) {
    return accSubtr(arg, this);
};


//如需要调用
//var a=12.32, b=12.3333
//(a).add(b);

//加法：add
//减法：subtr
//乘法：mul
//除法：div



