// 七牛去上传图片
$(function(){
    /*$.ajax({
        url: "http://jssdk-v2.demo.qiniu.io/api/uptoken",
        success: function (res) {
            var token1 = 'anEC5u_72gw1kZPSy3Dsq1lo_DPXyvuPDaj4ePkN:67Y8QEWdtuO33_6FnNq7_0Knfm8=:eyJkZWxldGVBZnRlckRheXMiOjcsInJldHVybkJvZHkiOiJ7XCJrZXlcIjpcIiQoa2V5KVwiLFwiaGFzaFwiOlwiJChldGFnKVwiLFwiZnNpemVcIjokKGZzaXplKSxcImJ1Y2tldFwiOlwiJChidWNrZXQpXCIsXCJuYW1lXCI6XCIkKHg6bmFtZSlcIn0iLCJzY29wZSI6Impzc2RrIiwiZGVhZGxpbmUiOjE1MjY5NjAxOTJ9';
            var domain = 'http://7j1xky.com1.z0.glb.clouddn.com/';
            var config = {
                useCdnDomain: true,
                disableStatisticsReport: false,
                retryCount: 5,
                region: qiniu.region.z0
            };
            var putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };
            uploadWithSDK(token1, putExtra, config, domain);
            //imageControl(domain);
            //uploadWithSDK(token1, putExtra, config, domain);
        }
    });*/

    //upQiniu();

    var token = 'anEC5u_72gw1kZPSy3Dsq1lo_DPXyvuPDaj4ePkN:RICQM2v2Du8Znqmf2MskzuczBok=:eyJkZWxldGVBZnRlckRheXMiOjcsInJldHVybkJvZHkiOiJ7XCJrZXlcIjpcIiQoa2V5KVwiLFwiaGFzaFwiOlwiJChldGFnKVwiLFwiZnNpemVcIjokKGZzaXplKSxcImJ1Y2tldFwiOlwiJChidWNrZXQpXCIsXCJuYW1lXCI6XCIkKHg6bmFtZSlcIn0iLCJzY29wZSI6Impzc2RrIiwiZGVhZGxpbmUiOjE1MjY5NzA2ODl9';
    var domain = 'http://7j1xky.com1.z0.glb.clouddn.com/';
    var config = {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 5,
        region: qiniu.region.z0
    };
    var putExtra = {
        fname: "",
        params: {},
        mimeType: null
    };

    $('.file').change(function () {
        var file = this.files[0];
        // eslint-disable-next-line
        var finishedAttr = [];
        var compareChunks = [];
        var observable;

        var that = $(this);
        if (file) {
            var key = file.name;

            // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
            var error = function(err) {
                console.log('0',err);
            };

            var complete = function(res) {
                if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
                    //console.log('1',res);

                    var fopArr = [];
                    fopArr.push({
                        fop: "imageView2",
                        mode: 2,
                        h: 450,
                        q: 100
                    });
                    var newUrl = qiniu.pipeline(fopArr, key, domain);
                    //console.log(that);
                    that.parent().find('.imgshow').attr("src", newUrl);
                    //console.log('newUrl',newUrl);
                }
            };

            var next = function(response) {
                var chunks = response.chunks||[];
                var total = response.total;
                // 这里对每个chunk更新进度，并记录已经更新好的避免重复更新，同时对未开始更新的跳过
                for (var i = 0; i < chunks.length; i++) {
                    if (chunks[i].percent === 0 || finishedAttr[i]){
                        continue;
                    }
                    if (compareChunks[i].percent === chunks[i].percent){
                        continue;
                    }
                    if (chunks[i].percent === 100){
                        finishedAttr[i] = true;
                    }
                }

                compareChunks = chunks;
                //console.log('compareChunks',compareChunks);
            };

            var subObject = {
                next: next,
                error: error,
                complete: complete
            };
            var subscription;
            // 调用sdk上传接口获得相应的observable，控制上传和暂停
            observable = qiniu.upload(file, key, token, putExtra, config);
            subscription = observable.subscribe(subObject);
        }
    });


})