$(function () {
    if (!login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    var getQuestionnaireList = api.getQuestionnaireList(i18nLanguage);

    // 提交调查问卷
    $('.questionSubmit').click(function () {

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/recommend/questionnaire/submit',
            dataType: 'json',
            data: {
                token:token,
                option_ids:[1,2]
            },
            success: function (data) {
                if (data.code === 200) {

                }
            },
            error: function () {
            }
        });

    })


});