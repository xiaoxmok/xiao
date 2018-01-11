
define(function(require) {

    var $ = require('jquery'),
        FE = require('sc-admin/v/sp-list-edit');
        
    $(function(){

           // 省市区联动
        $(document).area("eProvince", "eCity", "eArea", [44, 4403, 440305]);
        
    });

});