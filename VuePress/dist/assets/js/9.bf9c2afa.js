(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{159:function(l,i,t){"use strict";t.r(i);var v=t(0),e=Object(v.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var l=this,i=l.$createElement,t=l._self._c||i;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"http"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http","aria-hidden":"true"}},[l._v("#")]),l._v(" HTTP")]),t("p",[t("strong",[l._v("http状态码有那些？分别代表是什么意思？")])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[l._v(" 简单版\n    [\n        100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息\n        200  OK         正常返回信息\n        201  Created    请求成功并且服务器创建了新的资源\n        202  Accepted   服务器已接受请求，但尚未处理\n        301  Moved Permanently  请求的网页已永久移动到新位置。\n        302 Found       临时性重定向。\n        303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。\n        304  Not Modified 自从上次请求后，请求的网页未修改过。\n\n        400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。\n        401 Unauthorized 请求未授权。\n        403 Forbidden   禁止访问。\n        404 Not Found   找不到如何与 URI 相匹配的资源。\n\n        500 Internal Server Error  最常见的服务器端错误。\n        503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。\n    ]\n")])])]),t("p",[t("strong",[l._v("一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）")])]),t("ul",[t("li",[t("p",[l._v("注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，")])]),t("li",[t("p",[l._v("而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、")])]),t("li",[t("p",[l._v("到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；")])]),t("li",[t("p",[l._v("详细版：")]),t("ul",[t("li",[l._v("浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;")]),t("li",[l._v("调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;")]),t("li",[l._v("通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;")]),t("li",[l._v("进行HTTP协议会话，客户端发送报头(请求报头);")]),t("li",[l._v("进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;")]),t("li",[l._v("进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;")]),t("li",[l._v("处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;")]),t("li",[l._v("浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;")]),t("li",[l._v("文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;")]),t("li",[l._v("页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。")])])]),t("li",[t("p",[l._v("简洁版：")]),t("ul",[t("li",[l._v("浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；")]),t("li",[l._v("服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；")]),t("li",[l._v("浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；")]),t("li",[l._v("载入解析到的资源文件，渲染页面，完成。")])])])]),t("p",[t("strong",[l._v("说说TCP传输的三次握手四次挥手策略")])]),t("ul",[t("li",[t("p",[l._v("为了准确无误地把数据送达目标处，TCP协议采用了三次握手策略。用TCP协议把数据包送出去后，TCP不会对传送 后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了TCP的标志：SYN和ACK")])]),t("li",[t("p",[l._v("发送端首先发送一个带SYN标志的数据包给对方。接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息。 最后，发送端再回传一个带ACK标志的数据包，代表“握手”结束。 若在握手过程中某个阶段莫名中断，TCP协议会再次以相同的顺序发送相同的数据包")])])]),t("p",[t("strong",[l._v("断开一个TCP连接则需要“四次握手”：")])]),t("ul",[t("li",[t("p",[l._v("第一次挥手：主动关闭方发送一个FIN，用来关闭主动方到被动关闭方的数据传送，也就是主动关闭方告诉被动关闭方：我已经不 会再给你发数据了(当然，在fin包之前发送出去的数据，如果没有收到对应的ack确认报文，主动关闭方依然会重发这些数据)，但是，此时主动关闭方还可 以接受数据")])]),t("li",[t("p",[l._v("第二次挥手：被动关闭方收到FIN包后，发送一个ACK给对方，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号）")])]),t("li",[t("p",[l._v("第三次挥手：被动关闭方发送一个FIN，用来关闭被动关闭方到主动关闭方的数据传送，也就是告诉主动关闭方，我的数据也发送完了，不会再给你发数据了")])]),t("li",[t("p",[l._v("第四次挥手：主动关闭方收到FIN后，发送一个ACK给被动关闭方，确认序号为收到序号+1，至此，完成四次挥手")])])]),t("p",[t("strong",[l._v("TCP和UDP的区别")])]),t("ul",[t("li",[t("p",[l._v("TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。一个TCP连接必须要经过三次“对话”才能建立起来")])]),t("li",[t("p",[l._v("UDP（User Data Protocol，用户数据报协议）是与TCP相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去！ UDP适用于一次只传送少量数据、对可靠性要求不高的应用环境")])])]),t("p",[t("strong",[l._v("HTTP和HTTPS")])]),t("ul",[t("li",[l._v("HTTP协议通常承载于TCP协议之上，在HTTP和TCP之间添加一个安全协议层（SSL或TSL），这个时候，就成了我们常说的HTTPS")]),t("li",[l._v("默认HTTP的端口号为80，HTTPS的端口号为443")])]),t("p",[t("strong",[l._v("为什么HTTPS安全")])]),t("ul",[t("li",[l._v("因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用HTTPS，密钥在你和终点站才有。https之所以比http安全，是因为他利用ssl/tls协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer传递等。保障了传输过程的安全性")])]),t("p",[t("strong",[l._v("关于Http 2.0 你知道多少？")])]),t("ul",[t("li",[t("p",[l._v("HTTP/2引入了“服务端推（server push）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能。")])]),t("li",[t("p",[l._v("HTTP/2提供更多的加密支持")])]),t("li",[t("p",[l._v("HTTP/2使用多路技术，允许多个消息在一个连接上同时交差。")])]),t("li",[t("p",[l._v("它增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的header都只会占用很小比例的带宽")])])]),t("p",[t("strong",[l._v("GET和POST的区别，何时使用POST？")])]),t("ul",[t("li",[l._v("GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符")]),t("li",[l._v("POST：一般用于修改服务器上的资源，对所发送的信息没有限制。")]),t("li",[l._v("GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值，也就是说Get是通过地址栏来传值，而Post是通过提交表单来传值。")]),t("li",[l._v("然而，在以下情况中，请使用 POST 请求：\n"),t("ul",[t("li",[t("p",[l._v("无法使用缓存文件（更新服务器上的文件或数据库）")])]),t("li",[t("p",[l._v("向服务器发送大量数据（POST 没有数据量限制）")])]),t("li",[t("p",[l._v("发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠")])])])])]),t("p",[t("strong",[l._v("说说网络分层里七层模型是哪七层")])]),t("ul",[t("li",[t("p",[l._v("应用层：应用层、表示层、会话层（从上往下）（HTTP、FTP、SMTP、DNS）")])]),t("li",[t("p",[l._v("传输层（TCP和UDP）")])]),t("li",[t("p",[l._v("网络层（IP）")])]),t("li",[t("p",[l._v("物理和数据链路层（以太网）")])]),t("li",[t("p",[l._v("每一层的作用如下：")]),t("ul",[t("li",[l._v("物理层：通过媒介传输比特,确定机械及电气规范（比特Bit）\n数据链路层：将比特组装成帧和点到点的传递（帧Frame）")]),t("li",[l._v("网络层：负责数据包从源到宿的传递和网际互连（包PackeT）")]),t("li",[l._v("传输层：提供端到端的可靠报文传递和错误恢复（段Segment）")]),t("li",[l._v("会话层：建立、管理和终止会话（会话协议数据单元SPDU）")]),t("li",[l._v("表示层：对数据进行翻译、加密和压缩（表示协议数据单元PPDU）")]),t("li",[l._v("应用层：允许访问OSI环境的手段（应用协议数据单元APDU）")])])])]),t("p",[t("strong",[l._v("讲讲304缓存的原理")])]),t("ul",[t("li",[l._v("服务器首先产生ETag，服务器可在稍后使用它来判断页面是否已经被修改。本质上，客户端通过将该记号传回服务器要求服务器验证其（客户端）缓存")]),t("li",[l._v("304是HTTP状态码，服务器用来标识这个文件没修改，不返回内容，浏览器在接收到个状态码后，会使用浏览器已缓存的文件")]),t("li",[l._v("客户端请求一个页面（A）。 服务器返回页面A，并在给A加上一个ETag。 客户端展现该页面，并将页面连同ETag一起缓存。 客户再次请求页面A，并将上次请求时服务器返回的ETag一起传递给服务器。 服务器检查该ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304（未修改——Not Modified）和一个空的响应体")])]),t("p",[t("strong",[l._v("HTTP/2 与 HTTP/1.x 的关键区别")])]),t("ul",[t("li",[l._v("二进制协议代替文本协议，更加简洁高效")]),t("li",[l._v("针对每个域只使用一个多路复用的连接")]),t("li",[l._v("压缩头部信息减小开销")]),t("li",[l._v("允许服务器主动推送应答到客户端的缓存中")])]),t("p",[t("strong",[l._v("一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？")])]),t("ul",[t("li",[l._v("01.浏览器查找域名对应的IP地址(DNS 查询：浏览器缓存->系统缓存->路由器缓存->ISP DNS 缓存->根域名服务器)")]),t("li",[l._v("02.浏览器向 Web 服务器发送一个 HTTP 请求（TCP三次握手）")]),t("li",[l._v("03.服务器 301 重定向（从 http://example.com 重定向到 http://www.example.com）")]),t("li",[l._v("04.浏览器跟踪重定向地址，请求另一个带 www 的网址")]),t("li",[l._v("05.服务器处理请求（通过路由读取资源）")]),t("li",[l._v("06.服务器返回一个 HTTP 响应（报头中把 Content-type 设置为 'text/html'）")]),t("li",[l._v("07.浏览器进 DOM 树构建")]),t("li",[l._v("08.浏览器发送请求获取嵌在 HTML 中的资源（如图片、音频、视频、CSS、JS等）")]),t("li",[l._v("09.浏览器显示完成页面")]),t("li",[l._v("10.浏览器发送异步请求")])])])}],!1,null,null,null);i.default=e.exports}}]);