/**
 * 网通商场 购物车页面
 * @authors 谭子良
 * @date    2014-05-27 14:16:14
 * @version 1.0.0
 */

define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.form.select')($);

	

	$(function(){
		$('select').selectPluging();

		//增加商品数量
		function goodsIncrease(o){
			var $this = o;
			var count = parseInt($this.find(".count").val());
			var newConutNumber = count+1;
			$this.find(".count").val(newConutNumber);
			var oneGoods = parseFloat($this.parents("tr").find(".oneGoodsPrice").text());
			var endCount = (newConutNumber*oneGoods).toFixed(2);
			$this.parents("tr").find(".goodsCount").text(endCount);
		}

		$(".normal").find(".goods").each(function(){
			//加商品数量
			var $this = $(this);
			$this.find(".increase").click(function(){
				goodsIncrease($this);
			});
			//减商品数量

		});





	})

});