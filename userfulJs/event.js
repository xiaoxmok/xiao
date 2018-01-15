
/**
 * 封装事件
 * 解决事件绑定时浏览器兼容性问题
 * @type {{addHandler: eventUtil.addHandler, removeHandler: eventUtil.removeHandler}}
 */
var eventUtil = {
    /**
     * 添加句柄 优雅降级
     * @param element 节点
     * @param type  事件类型
     * @param handler  事件处理程序
     */
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            //Dom2级 非IE
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            //Dom2级 IE、opera
            element.attachEvent('on' + type, handler);
        } else {
            //Dom0级
            element['on' + type] = handler;
            //element.onclick === element['on'+type];
            //alert("Dom0级");
        }
    },
    /**
     * 删除句柄 优雅降级
     * @param element
     * @param type
     * @param handler
     */
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            //Dom2级 非IE
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            //Dom2级 IE8以下、opera
            element.detachEvent('on' + type, handler);
        } else {
            //Dom0级
            element['on' + type] = null;
            //element.onclick === element['on'+type];
        }
    },
    /**
     * 获取event的兼容写法
     * @param event
     * @returns {Event}
     */
    getEvent: function (event) {
        return event ? event : window.event;
    },
    /**
     *获取事件类型 的兼容性写法
     * @param event
     *
     */
    getType: function (event) {
        event = this.getEvent(event);
        return event.type;
    },
    /**
     *获取事件节点 的兼容性写法
     * @param event
     * @returns {EventTarget|Object}
     */
    getElement: function (event) {
        event = this.getEvent(event);
        return event.target || event.srcElement;
    },
    /**
     * 停止事件冒泡 的兼容写法
     * @param event
     */
    stopPropagation: function (event) {
        event = this.getEvent(event);

		/*if (event.stopPropagation) {
		 event.stopPropagation();
		 } else {
		 event.cancelBubble = true;
		 }
		 */
        window.event ? event.cancelBubble = true : event.stopPropagation();
    },
    /**
     * 阻止事件默认行为 的兼容写法
     * @param event
     */
    preventDefault: function (event) {
        event = this.getEvent(event);

		/*if (event.preventDefault) {
		 event.preventDefault();
		 } else {
		 event.returnValue = true;
		 }*/

        window.event ? event.returnValue = false : event.preventDefault();
    },
    //获取相关元素
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    //获取charCode
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    //剪贴板相关方法
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardText: function (event) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain",value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text",value);
        }
    }
};