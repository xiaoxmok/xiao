var oHtml = document.documentElement;
getFont();
window.onresize = function(){

    getFont();

}
function getFont(){
    var screenWidth = oHtml.clientWidth;
    if(screenWidth <= 320){

        oHtml.style.fontSize = '20px';
    }else if(screenWidth >= 640){

        oHtml.style.fontSize = '40px';
    }else{

        oHtml.style.fontSize = screenWidth/(640/40)+'px';

    }
}
// 错误提示弹窗
function tanErro(){
    var tanErro=document.getElementsByClassName('tan-erro');
    tanErro[0].style.display='block'
    setTimeout(function(){
         tanErro[0].style.display='none'
    },3000)
}

window.onload=function(){

    // 解决:active在ios系统没效果的问题
	document.body.addEventListener('touchstart', function () { });

    
    
}
