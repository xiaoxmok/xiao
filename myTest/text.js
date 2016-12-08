(function(){
    var addEvent = (function(){
            if (window.addEventListener) {
                return function(el, sType, fn, capture) {
                    el.addEventListener(sType, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, sType, fn, capture) {
                    el.attachEvent("on" + sType, fn);
                };
            } else {
                return function(){};
            }
        })(),
        content = document.getElementById('content');


    // IE6/IE7/IE8/Opera 10+/Safari5

    addEvent(content, 'mousewheel',  function(event){
        event = window.event || event ;
        var bt=$('.all_row').css('bottom');
        var top=$('.all_row').css('top');


        if(parseInt(top)!=0){
            if(event.wheelDelta){                               //IE/Opera/Chrome
                if(event.wheelDelta==120) {                       //向上滚动事件
                    $('.all_row').animate({top:"+=726px"},800);
                }
            }else if(event.detail){                                 //Firefox
                if(event.detail==-3) {                              //向上滚动事件<br>
                    $('.all_row').animate({top:"+=726px"},800);
                }
            }
        }
        if(parseInt(bt)<0){
            if(event.wheelDelta){                               //IE/Opera/Chrome
                if(event.wheelDelta==-120) {                       //向上滚动事件
                    $('.all_row').animate({top:"-=726px"},800);
                }
            }else if(event.detail){                                 //Firefox
                if(event.detail==3) {                              //向上滚动事件<br>
                    $('.all_row').animate({top:"-=726px"},800);
                }
            }
        }





        if(event.wheelDelta){                               //IE/Opera/Chrome
             if(event.wheelDelta==120) {                       //向上滚动事件
                if(parseInt(top)!=0){
                    $('.all_row').animate({top:"+=726px"},800);
                }
                }else {                                       //向上滚动事件
             if(parseInt(bt)<0){
                $('.all_row').animate({top:"-=726px"},800);
                }
             }
         }else if(event.detail){                                 //Firefox
         if(event.detail==-3) {                              //向上滚动事件<br>
         if(parseInt(top)!=0){
         $('.all_row').animate({top:"+=726px"},800);
         }
         }else {                                         //向下滚动事件<br>
         if(parseInt(bt)<0){
         $('.all_row').animate({top:"-=726px"},800);
         }
         }
         }



    }, false);

    // Firefox 3.5+
    /*addEvent(content, 'DOMMouseScroll',  function(event){
     event = window.event || event ;

     var bt=$('.all_row').css('bottom');
     var top=$('.all_row').css('top');
     if(event.wheelDelta < 0 || event.detail > 0){//IE/Opera/Chrome
     if(parseInt(bt)<0){
     $('.all_row').animate({top:"-=726px"},500);
     }
     }else if(event.wheelDelta > 0 || event.detail < 0){//Firefox
     if(parseInt(top)!=0){
     $('.all_row').animate({top:"+=726px"},500);
     }
     }
     }, false);*/
})();/**
 * Created by Administrator on 2016/9/5.
 */
//////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////


$(function(){
    $(".scroll p").height($("#scroll").height() / ($(".all_row").height()/$(".content").height()));
    var Bool=false;
    var Scro=$("#scroll");
    var Scrp=$("#p");
    var Scrobd=$(".content");
    var Scrorow=$(".all_row");
    var Scrp_Height =Scrp.outerHeight()/2;
    var Num2=Scro.outerHeight()-Scrp.outerHeight();
    var offsetX=0;
    var offsetY=0;
    var scroll_m=document.getElementById("content").offsetTop + document.getElementById("banner2").offsetTop;

    Scrp.mousedown(function(e){
        Bool=true;
    });
    $(document).mouseup(function(){
        Bool=false;
    });
    $(document).mousemove(function(e){
        if(Bool){
            var Num1= e.pageY - scroll_m;
            var y=Num1 - Scrp_Height;
            if(y<=1){
                Scrll(0);
                Scrp.css("top",1);
            }else if(y>=Num2){
                Scrp.css("top",Num2);
                Scrll(Num2);
            }else{
                Scrll(y);
            }
        }
    });
    function Scrll(y){
        Scrp.css("top",y);
        Scrorow.css("margin-top",-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scrorow.outerHeight()-Scrobd.height()));
    }
    if(document.getElementById("content").addEventListener)
        document.getElementById("content").addEventListener('DOMMouseScroll',wheel,true);
    document.getElementById("content").onmousewheel=wheel;
    var Distance=Num2*0.1;
    function wheel(e){
        var evt = e || window.event;
        var wheelDelta = evt.wheelDelta || evt.detail;
        if(wheelDelta == -120 || wheelDelta == 3){
            var Distances=Scrp.position().top+Distance;
            if(Distances>=Num2){
                Scrp.css("top",Num2);
                Scrll(Num2);
            }else{
                Scrll(Distances);
            }
            return false;
        }else if (wheelDelta == 120 || wheelDelta == -3){
            var Distances=Scrp.position().top-Distance;
            if(Distances<=1){
                Scrll(0);
                Scrp.css("top",1);
            }else{
                Scrll(Distances);
            }
            return false;
        }
    }
});