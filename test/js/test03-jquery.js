$(window).on("load",function(){
	waterFall();

	var imgData={"data":[{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"},{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"},{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"}]};
	$(window).on("scroll",function(){
		if(checkScrollSlide){
			$.each(imgData.data,function(key,value){			//遍历imgData,function(索引，值)
				var oBox = $('<div>').addClass('box').appendTo($('#main'));			//创建box div	
				var oPic = $('<div>').addClass('bo_img').appendTo($(oBox));			//创建bo_img div
				$('<img>').attr("src","../img/"+$(value).attr('src')).appendTo($(oPic));	//创建img

				//console.log("../img/"+value.src);
			})
			waterFall();
		}
	})
})

function waterFall(){
	var $boxs = $("#main>div");								//获取main下所有的box
	var w = $boxs.eq(0).outerWidth();						//获取单个box的宽度
	var cols = Math.floor($(window).width()/w);				//获取每行显示的个数
	$("#main").width(w*cols).css("margin","0 auto");		//设置每行的总宽度，以及居中
	var hArr=[];
	$boxs.each(function(index, value){
		var h=$boxs.eq(index).outerHeight();				//获取每个box的高度
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH = Math.min.apply(null,hArr);			//从hArr的box高度中获取最小值
			var minHindex = $.inArray(minH,hArr);			//获取高度最小的box标志位
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHindex*w+'px'
			});
		}
		hArr[minHindex]+=$boxs.eq(index).outerHeight();
	})
}

function checkScrollSlide(){
	var $lastBox = $("#main>div").last();					//获取main中最后一个div
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);	//获取最后一个box的高度+自身高度的一半
	var scrollTop = $(window).scrollTop();					//获取滚动的高度
	var documentH = $(window).height();						//获取屏幕可视区域的高度

	return (lastBox<scrollTop+documentH)?true:false;		//返回true或false

}