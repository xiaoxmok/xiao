$(function(){
    if (!login()) {
        location.href = "login.html"
    }

    var token = getCookie('token');

    api.getRecommendGoodsForSchool()


});