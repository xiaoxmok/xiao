define(function($) {

    return function($) {

        ;
        (function($, window, undefined) {

            $.prototype.area = function(province, city, county, initArr) {
                var s = [province, city, county],
                    $s0 = $("#" + s[0]),
                    $s1 = $("#" + s[1]),
                    $s2 = $("#" + s[2]);
                $s0.children().remove();
                $s1.children().remove();
                $s2.children().remove();

                function setItem(obj, num){
                    var arr = obj.split(',');
                    for (var i = 0, len = arr.length; i < len; i++) {
                        var item = arr[i].split('|'),
                            code = item[0],
                            name = item[1];
                        $("#" + s[num])[0].options[i] = new Option(name, code);
                    }
                    //console.log(initArr[num]);
                    if (initArr.length > 0 && initArr[num] !== '') $("#" + s[num]).val(initArr[num]).change();
                }

                var time = new Date().getTime();
                var ajaxUrl = 'http://my.wt.com/ssl/getcitydata/?R=' + time + '&callback=?';

                // province
                $.getJSON(ajaxUrl, {
                    type: "Province",
                    ProvinceID: "0001"
                }, function(ret) {
                    setItem(ret, 0);
                });
                
                // city
                $("#" + s[0]).off('change').on('change', function() {
                    var pid = this.value;
                    $.getJSON(ajaxUrl, {
                        type: "City",
                        ProvinceID: pid
                    }, function(ret) {
                        setItem(ret, 1);
                    });
                });
                // area
                $("#" + s[1]).off('change').on('change', function() {
                    var cid = this.value;
                    $.getJSON(ajaxUrl, {
                        type: "District",
                        CityID: cid
                    }, function(ret) {
                        setItem(ret, 2);
                    });
                });
            }
        })(jQuery, window);

    }

});
