/**
 * 原生js写的添加、删除、替换class
 * @type {string | null}
 */

var classVal = document.getElementById("id").getAttribute("class");

classVal = " " + classVal + " ";

//删除的话，有三个地方加空格
classVal = classVal .replace(" someClassName "," ");
document.getElementById("id").setAttribute("class",classVal );

//添加的话，有一个地方加空格
classVal = classVal .concat(" someClassName");
document.getElementById("id").setAttribute("class",classVal );

//替换的话，有四个地方加空格
classVal = classVal .replace(" someClassName "," otherClassName ");
document.getElementById("id").setAttribute("class",classVal );