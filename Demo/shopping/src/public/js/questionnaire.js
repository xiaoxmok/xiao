$(function () {
    if (!login()) {
        location.href = "index.html"
    }

    var token = getCookie('token');

    var getQuestionnaireList = api.getQuestionnaireList(i18nLanguage);

    getQuestionnaireList.forEach(function(item,index){
        var options = item.options;
        var option;
        options.forEach(function(opt,index){
            if(index === 0){
                option = '<p><input type="radio" id="radio'+item.id+'_'+opt.id+'" data-name="'+opt.id+'" name="radio'+item.id+'" checked><label for="radio'+item.id+'_'+opt.id+'">'+opt.name+'</label></p>'
            }else{
                option += '<p><input type="radio" id="radio'+item.id+'_'+opt.id+'" data-name="'+opt.id+'" name="radio'+item.id+'"><label for="radio'+item.id+'_'+opt.id+'">'+opt.name+'</label></p>'
            }

        })

        var html = '<div class="question">\n' +
            '        <h4>'+item.name+'</h4>\n' +
                        option +
            '    </div>';

        $('.questionnaire .content').append(html);
    })

    // 提交调查问卷
    $('.questionSubmit').click(function () {
        var option_ids = [];
        $('.question').each(function(){
            var value = $(this).find('input[type="radio"]:checked').attr("data-name");
            option_ids.push(value);
        })

        $.ajax({
            type: 'POST',
            url: url + '/api/v1/recommend/questionnaire/submit',
            dataType: 'json',
            data: {
                token:token,
                option_ids:option_ids
            },
            success: function (data) {
                if (data.code === 200) {
                    $('.error').html('提交成功！');
                    setTimeout(function () {
                        location.href = "center.html"
                    }, 1000);
                }
            },
            error: function () {
            }
        });

    })


});