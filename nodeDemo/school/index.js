/**
 * Created by xiaoxm on 2017/2/28.
 */
var className = require("./class");

//className.add("KUE","xiao",['小熊','斌斌','管子','西瓜']);
function add(classes){
    classes.forEach(function(item,index){
        var _class=item.class;
        var teacherName=item.teacher;
        var students=item.student;

        className.add(_class,teacherName,students);
    })

};

var s={
    "school":[
        {"class":"KUE","teacher":"xiao","student":['小熊','斌斌','管子','西瓜']},
        {"class":"KILL","teacher":"xiao","student":['小熊','斌斌','管子','西瓜']},
        {"class":"FIRE","teacher":"xiao","student":['小熊','斌斌','管子','西瓜']}
    ]
};

add(s.school);

exports.add=add;