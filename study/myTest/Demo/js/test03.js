window.onload=function(){
	imgLocation("main","box");
	onLoading("block");
    resize();
	
	window.onscroll = function(){
		if(checkFlag()){
			var onTime=3;
			var intervalId=setInterval(function(){
				if(onTime==-1){
					clearInterval(intervalId);
					toShow();
					document.getElementById("div3").innerHTML="正在加载...";
				}else{
					document.getElementById("div3").innerHTML="正在加载("+onTime+")";
					onTime--;
				}
			},1000);

			//setTimeout(toShow,5000);
		}
	}
};

function toShow(){
	onLoading("none");
	var imgData={"data":[{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"},{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"},{"src":"bg_1.jpg"},{"src":"bg_2.jpg"},{"src":"bg_3.jpg"},{"src":"bg_6.jpg"},{"src":"bg_4.jpg"},{"src":"bg_5.jpg"}]};
	var cParent = document.getElementById("main");
	for(var i=0;i<imgData.data.length;i++){
		var ccontent = document.createElement("div");
		ccontent.className="box";
		cParent.appendChild(ccontent);
		var boximg = document.createElement("div");
		boximg.className="bo_img";
		ccontent.appendChild(boximg);
		var img = document.createElement("img");
		img.src="./img/"+imgData.data[i].src;
		boximg.appendChild(img);
	}
	imgLocation("main","box");
	onLoading("block");
}

function onLoading(){										//是否显示正在加载
	var cParent = document.getElementById("div2");
	var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
	cParent.style.top=scrollHeight+"px";
	cParent.style.display=arguments[0];

}


function checkFlag(){										//判断页面是否到底部
	var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;	//获取文档的总高度
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;			//获取Y轴上滚动的距离，考虑浏览器兼容性问题; 
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;		//获浏览器视口高度
	//console.log(scrollHeight+":"+scrollTop+":"+pageHeight);

	if(scrollHeight<=scrollTop+pageHeight){
		
		return true;
	}
}



function imgLocation(parent, content){							
	//将parent下所有的content取出
	var cParent = document.getElementById(parent);
	var ccontent = getChildElement(cParent, content);
	var imgWidth = ccontent[0].offsetWidth;					//图片宽度
	//var cols = Math.floor(document.documentElement.clientWidth / imgWidth);			//获取个数
	var cols = Math.floor(cParent.offsetWidth / imgWidth);			//获取个数
	cParent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto;";

	var boxHeightArr = [];
	for(var i=0;i<ccontent.length;i++){
		if(i<cols){
			boxHeightArr[i] = ccontent[i].offsetHeight;
			//console.log(boxHeightArr[i]);
		}else{
			var minHeight = Math.min.apply(null, boxHeightArr);				//取每一个box的高度，取最小值。
			var minIndex = getminheightLocation(boxHeightArr,minHeight);		//获取 最小高度index
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=minHeight+"px";
			ccontent[i].style.left= ccontent[minIndex].offsetLeft+"px";
			boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;

			var maxHeight = Math.max.apply(null, boxHeightArr);

			cParent.style.height=maxHeight+"px";
		}
	}


}

function getminheightLocation(boxHeightArr,minHeight){			//获取高度最小的图片
	for(var i in boxHeightArr){
		if(boxHeightArr[i]==minHeight){
			return i;
		}
	}
}


function getChildElement(parent, content){						//获取下一张图片
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
				contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}

function resize(){					//自适应屏幕宽度
	var main=document.getElementById("main");
	main.style.width=document.body.offsetWidth;
    //alert(main.style.width);

}


window.onresize=function(){
	resize();
};

