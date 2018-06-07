$(function () {
    if (!login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    var getQuestionnaireList = api.getQuestionnaireList(i18nLanguage);

    getQuestionnaireList.forEach(function(item,index){
        var options = item.options;
        options.forEach(function(item,index){

        })

        var html = '<div class="question">\n' +
            '        <h4>'+item.name+'</h4>\n' +

            '        <p><input type="radio" id="radio'+item.id+'_2" name="radio'+item.id+'"><label for="radio'+item.id+'_2">8000到10000</label></p>\n' +
            '        <p><input type="radio" id="radio'+item.id+'_3" name="radio'+item.id+'"><label for="radio'+item.id+'_3">10000到12000</label></p>\n' +
            '        <p><input type="radio" id="radio'+item.id+'_4" name="radio'+item.id+'"><label for="radio'+item.id+'_4">12000到15000</label></p>\n' +
            '    </div>';



    })


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