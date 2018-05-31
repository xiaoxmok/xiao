$(function () {
    if (login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');


    $('.questionSubmit').click(function () {

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/recommend/questionnaire/submit',
            dataType: 'json',
            data: {},
            success: function (data) {
                if (data.code === 200) {

                }
            },
            error: function () {
            }
        });

    })


});