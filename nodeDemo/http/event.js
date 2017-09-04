/**
 * Created by xiaoxm on 2017/3/1.
 */
//事件
//当事件触发时调用
function clickIt(){
    window.alert("Button is clicked");
}
var Button=document.getElementById("button");
Button.addEventListener("click",clickIt);

// EventEmitter