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

window.onload=function(){

    // 解决:active在ios系统没效果的问题
	document.body.addEventListener('touchstart', function () { });
};



