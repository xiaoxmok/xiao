$(function(){function s(){if(login())api.getCartList(getCookie("userId"),i18nLanguage,function(t){var a=0;t.forEach(function(t,e){a+=t.quantity}),$(".cart .count").html(a)});else if(getCookie("localCart")){var t=getCookie("localCart").split(","),n=0;t.forEach(function(t,e){var a=t.split("-");n+=parseInt(a[1])}),$(".cart .count").html(n)}}$(".cartDetail table").on("click",'input[name="selectAll"]',function(){$(this).is(":checked")?$('input[name="select"]').each(function(){$(this).prop("checked",!0)}):$('input[name="select"]').each(function(){$(this).prop("checked",!1)})});var i=[];$(".cartDetail table").on("click",'input[type="checkbox"]',function(){c()});var l=[];function c(){var a=0,n=[];i=[],$("input[name='select']:checked").each(function(){var t={"title":$(this).parent().parent().find(".title").html(),"price":parseFloat($(this).parent().parent().find(".price em").html())},e={"sku_id":$(this).val(),"quantity":$(this).parent().parent().find("#quantity").val()};n.push(t),i.push(e),a+=t.price}),$(".Clearing .all em").html(a.toFixed(2)),$(".Clearing .amount em").html(n.length),0===n.length&&($(".Clearing .all em").html("0.00"),$('.cartDetail input[name="selectAll"]').prop("checked",!1))}function e(t){var e;($(".cartDetail table").html(""),e=isEnglish()?'<tr>\n                <th><input type="checkbox" name="selectAll" id="selectAll"><label for="selectAll">Select All</label></th>\n                <th>Items</th>\n                <th class="td3">Numbers</th>\n                <th>Subtotal</th>\n                <th>Manage</th>\n            </tr>':'<tr>\n                <th><input type="checkbox" name="selectAll" id="selectAll"><label for="selectAll">全选</label></th>\n                <th>商品</th>\n                <th class="td3">数量</th>\n                <th>小计</th>\n                <th>操作</th>\n            </tr>',$(".cartDetail table").append(e),t.forEach(function(t,e){var a,n,i=(t.sku_info.school_price*t.quantity).toFixed(2);l.in_array(t.sku_info.goods_id)||l.push(t.sku_info.goods_id),n=0<t.sku_info.img_infos.length?t.sku_info.img_infos[0].url:t.sku_info.goods_cover_url,a=isEnglish()?'<tr class="skuId">\n                <td><input type="checkbox" class="select" name="select" data-name="'+t.id+'" value="'+t.sku_id+'"></td>\n                <td>\n                    <a href="./product.html?id='+t.sku_info.goods_id+'">                       <div class="img"><img src="'+n+'" alt=""></div>\n                    </a>                    <div class="con">\n                        <p class="title">'+t.sku_info.goods_name+'</p>\n                        <span class="unit_price">￥<em>'+t.sku_info.school_price+'</em></span>\n                        <div class="amountM btnNum">                           <input type="button" value="-" class="less">                           <input type="text" value="'+t.quantity+'" class="text" id="quantity" data-name="'+t.id+'" readonly>                           <input type="button" value="+" class="plus">\n                        </div>                    </div>\n                </td>\n                <td class="td3 btnNum">\n                    <input type="button" value="-" class="less">                    <input type="text" value="'+t.quantity+'" class="text" id="quantity" data-name="'+t.id+'" readonly>                    <input type="button" value="+" class="plus">                </td>\n                <td class="price">￥<em>'+i+'</em></td>\n                <td class="operate">\n                    <a href="javascript:;" id="delete" data-name="'+t.id+'">Delete</a>\n                </td>\n            </tr>':'<tr class="skuId">\n                <td><input type="checkbox" class="select" name="select" data-name="'+t.id+'" value="'+t.sku_id+'"></td>\n                <td>\n                    <a href="./product.html?id='+t.sku_info.goods_id+'">                       <div class="img"><img src="'+n+'" alt=""></div>\n                    </a>                    <div class="con">\n                        <p class="title">'+t.sku_info.goods_name+'</p>\n                        <span class="unit_price">￥<em>'+t.sku_info.school_price+'</em></span>\n                        <div class="amountM btnNum">                           <input type="button" value="-" class="less">                           <input type="text" value="'+t.quantity+'" class="text" id="quantity" data-name="'+t.id+'" readonly>                           <input type="button" value="+" class="plus">\n                        </div>                    </div>\n                </td>\n                <td class="td3 btnNum">\n                    <input type="button" value="-" class="less">                    <input type="text" value="'+t.quantity+'" class="text" id="quantity" data-name="'+t.id+'" readonly>                    <input type="button" value="+" class="plus">                </td>\n                <td class="price">￥<em>'+i+'</em></td>\n                <td class="operate">\n                    <a href="javascript:;" id="delete" data-name="'+t.id+'">删除</a>\n                </td>\n            </tr>',$(".cartDetail table").append(a)}),login())&&($(".recommend ul").html(""),api.getRecommendAccessoryForGoods(l,0,1,20,"%2Bsale",i18nLanguage).data.forEach(function(t,e){var a,n;a=0<t.sku_infos.length?t.sku_infos[0].id:"",n=isEnglish()?'<li>\n                    <a href="./product.html?id='+t.id+'">                    <img src="'+t.img_infos[0].url+'" alt=""></a>\n                    <div class="con">\n                        <p class="Title">'+t.name+'</p>\n                        <p class="description">'+t.summary+'</p>\n                        <p class="price"><span>MSRP：</span>\n                            <del>￥'+t.price+'</del>\n                        </p>\n                        <p class="price"><span>School Special Offer：</span><em>￥'+t.school_price+'</em></p>\n                        <a class="apply" href="javascript:;" data-name="'+a+'">Add to Cart</a>\n                    </div>\n                </li>':'<li>\n                    <a href="./product.html?id='+t.id+'">                    <img src="'+t.img_infos[0].url+'" alt=""></a>\n                    <div class="con">\n                        <p class="Title">'+t.name+'</p>\n                        <p class="description">'+t.summary+'</p>\n                        <p class="price"><span>常规价格：</span>\n                            <del>￥'+t.price+'</del>\n                        </p>\n                        <p class="price"><span>学校优惠价：</span><em>￥'+t.school_price+'</em></p>\n                        <a class="apply" href="javascript:;" data-name="'+a+'">加入购物车</a>\n                    </div>\n                </li>',$(".recommend ul").append(n)}));$(".btnNum").on("click",".less",function(){var t=$(this).parent().find(".text").val(),e=$(this).parent().find(".text").attr("data-name");if(1<t)if(t--,$(this).parentsUntil("table",".skuId").find("#quantity").attr("value",t),$(this).parent().find("#quantity").attr("value",t),login()){if(200===api.getCartUpdate(e,t).code){var a=(parseFloat($(this).parentsUntil("table",".skuId").find(".unit_price em").html())*t).toFixed(2);$(this).parentsUntil("table",".skuId").find(".price em").html(a),c(),s()}}else if(getCookie("localCart")){var n,i=getCookie("localCart"),l=$(this).parent().parent().find(".select").val();(o=i.split(",")).forEach(function(t,e){t.split("-")[0]==l&&(flag=!1,n=e,t.split("-"))}),o.splice(n,1,l+"-"+t),getCookie("localCart",o,{"expires":30,"path":"/"}),s()}}),$(".btnNum").on("click",".plus",function(){var t=$(this).parent().find(".text").val(),e=$(this).parent().find(".text").attr("data-name");if(t++,$(this).parentsUntil("table",".skuId").find("#quantity").attr("value",t),$(this).parent().find("#quantity").attr("value",t),login()){if(200===api.getCartUpdate(e,t).code){var a=(parseFloat($(this).parentsUntil("table",".skuId").find(".unit_price em").html())*t).toFixed(2);$(this).parentsUntil("table",".skuId").find(".price em").html(a),c(),s()}}else if(getCookie("localCart")){var n,i=getCookie("localCart"),l=$(this).parent().parent().find(".select").val();(o=i.split(",")).forEach(function(t,e){t.split("-")[0]==l&&(flag=!1,n=e,t.split("-"))}),o.splice(n,1,l+"-"+t),getCookie("localCart",o,{"expires":30,"path":"/"}),s()}})}if(login()){getCookie("token");api.getCartList(getCookie("userId"),i18nLanguage,e),$(".cartDetail table").on("click","#delete",function(){var t=$(this).attr("data-name");200===api.getCartDelete(t).code&&($(this).parent().parent().remove(),s(),c())}),$("#settle").click(function(){if(0===i.length)isEnglish()?$(".error").html("Please select product order."):$(".error").html("请选择商品下单。");else{$(".error").html("");var a="";i.forEach(function(t,e){a+=0===e?"goods"+e+"="+t.sku_id+"_"+t.quantity:"&goods"+e+"="+t.sku_id+"_"+t.quantity}),location.href="submitOrder.html?"+a}}),$(".recommend .content").on("click",".apply",function(){var t=$(this).attr("data-name");200===api.getCartCreate(getCookie("userId"),t,1).code&&($(".zhezhao").show(),isEnglish()?$(".tan2 .con p").html("Add to Cart successful."):$(".tan2 .con p").html("加入购物车成功。"),$(".tan2").show(),api.getCartList(getCookie("userId"),i18nLanguage,e),setTimeout(function(){$(".zhezhao").hide(),$(".tan2").hide()},1e3))})}else{if($(".recommend").hide(),getCookie("localCart")){var n,o=getCookie("localCart").split(","),r=[];o.forEach(function(t,e){n=t.split("-")[0];var a={"id":e,"quantity":t.split("-")[1],"sku_id":n,"sku_info":api.getSkuInfo(n,i18nLanguage)};r.push(a)}),console.log(r),e(r)}$(".cartDetail table").on("click","#delete",function(){var a,t=getCookie("localCart"),n=$(this).parent().parent().find(".select").val();(o=t.split(",")).forEach(function(t,e){t.split("-")[0]==n&&(flag=!1,a=e,t.split("-"))}),o.splice(a,1),getCookie("localCart",o,{"expires":30,"path":"/"});var i,l=[];o.forEach(function(t,e){i=t.split("-")[0];var a={"id":e,"quantity":t.split("-")[1],"sku_id":i,"sku_info":api.getSkuInfo(i,i18nLanguage)};l.push(a)}),e(l),s()}),$("#settle").click(function(){isEnglish()?$(".error").html("Please sign in"):$(".error").html("请先登录。")})}});