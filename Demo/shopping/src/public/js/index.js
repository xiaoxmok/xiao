$(function(){

    $.ajax({
        type:'GET',
        url:'http://byod.1o24.com/api/v1/banner/index',
        dataType:'json',
        success:function(data){
            console.log(data);
        },
        error:function(xhr,status,error){
            console.log(xhr,status,error);
        }

    })

})