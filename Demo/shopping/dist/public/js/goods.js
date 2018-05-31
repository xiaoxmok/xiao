$(function(){
    if (login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');



})