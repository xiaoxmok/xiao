/**
 * Created by xiaoxm on 2017/2/28.
 */
var student = require('./student');
var teacher = require('./teacher');

function add(className,teacherName,students){
    console.log("Add Class:"+className);

    teacher.add(teacherName);

    students.forEach(function(item,index){
        student.add(item);
    })

}

exports.add = add;

//两种方式效果一样
module.exports.add = add;