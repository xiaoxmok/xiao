/*============向URL末尾添加查询字符串=============*/
function addURLParam (url,name,value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURLComponent(name) + "=" + encodeURLComponent(value);
    return url;
}

/*========================跨浏览器的CORS=======================*/
function createCORSRequest (method,url) {
    var xhr = createXHR();
    if ("withCredentails" in xhr) {
        xhr.open(method,url,true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method,url);
    } else {
        xhr = null;
    }
    return xhr;    
}

/*=====================使用XHT对象实现HTTP流=======================*/
function createStreamingClient (url,progress,finished) {
    var xhr = new XMLHttpRequest();
    var received = 0;
    xhr.open("get",url,true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            //只取得最近数据并调整计数器
            result = xhr.responseText.substring(received);
            received += result.length;

            //调用progress函数
            progress(result);
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);
        }
    }
    xhr.send(null);
    return xhr;
}

//生成区间内的随机数
function selectFrom (lowerValue,upperValue) {
    var l = upperValue - lowerValue;
    return Math.floor(Math.random() * l + lowerValue);
}

//确定属性存在于对象中还是原型中
function hasPrototypePropoty (object,name) {
    return !object.hasOwnProperty(name) && (name in object);
}

//确定哪天是1月1日
(function (){
    var now = new Date();
    if (now.getMonth() == 0 && now.getDate() == 1) {
        alert("Happy New Year");
    }
})();//用了私有作用域，可减少闭包占用的内存，因为没有指向匿名函数的引用，只要函数执行完毕，就可以立即撤销其作用域链了。

//取得页面视口大小
function getViewSize () {
    var pageSize = {
        pageWidth: window.innerWidth,
        pageHeight: window.innerHeight
    };
    
    if (typeof pageSize.pageWidth != "number") {
        if (document.compatMode == "CSS1Compat") {
            pageSize.pageWidth = document.documentElement.clientWidth;
            pageSize.pageHeight = document.documentElement.clientHeight;
        } else {
            pageSize.pageWidth = document.body.clientWidth;
            pageSize.pageHeight = document.body.clientHeight;
        }
    }
    return pageSize;
}

//解析查询字符串
function getQueryStringAgs() {
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    //保存数据的对象
    var args = {};
    //取得每一项
    var items = qs.length ? qs.split("&") : [];
    var item = null;
    var name = null;
    var value = null;
    var i = 0;
    var len = items.length;
    //逐个将每一项添加到args对象中
    for (i = 0;i < len;i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }
    return args;//args是一个对象，args[name] = value
}




//将NodeList对象转换为数组
function convertToArray (nodes) {
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes,0);//针对于非IE浏览器
    } catch (ex) {
        array = new Array();
        for (var i = 0;i < nodes.length;i++) {
            array.push(nodes[i]);
        }
    }
    return array;
}

//加载外部script代码
function loadScript (url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.appendChild(script);
}

//动态加载外部样式表
function loadStyle (url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
//matchesSelector()方法
function matchesSelector (element,selector) {
    if (element.matchesSelector) {
        return element.matchesSelector(selector);
    } else if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector) {
        return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
        return element.webkitMatchesSelector(selector);
    } else {
        throw new Error ("Not supported");
    }
}

//删除element元素的className类
function removeClass (element,className) {
    //取得类名字符串并拆分成数组
    var classNames = element.className.split(/\s+/);
    //找到要删除的类名
    var len = classNames.length;
    for (var i = 0 ; i < len; i ++) {
        if (classNames[i] == className) {
            break;
        }
    }
    classNames.splice(i,1);
    element.className = classNames.join(" ");
}

//取得文档head元素
function head () {
    var head = document.head || document.getElementsByTagName("head")[0];
    return head;
}

//设置元素文本
function getInnerText (element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}
function setInnerText (element,text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

//获取CSS样式
function getCSS (element,key) {
    var computedStyle = element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element,null);
    return computedStyle[key];
}

//取得元素在页面中的位置，返回左偏移量和上偏移量
function getElementLocation (element) {
    var loc = {
        left:0,
        top:0
    };
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while(current !== null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    loc.left = actualLeft;
    loc.top = actualTop;
    return loc;
}

//客户端数据存储,持久保存客户端数据的方案，适用于长期保存用户偏好设置！
function getLocalStorage () {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage;
    } else {
        throw new Error ("Local storage not available")
    }

}