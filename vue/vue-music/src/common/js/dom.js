// 增加样式
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

// 判断是否存在样式
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}


// 获取dom属性的值
export function getData(el, name, val) {
  const prefix = 'data-';
  name = prefix + name;

  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name, val)
  }
}


// 给js中写的样式加前缀

let elementSytle = document.createElement('div').style

// 判断当前浏览器支持哪个前缀
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementSytle[transformNames[key]] !== undefined) {
      return key
    }
  }

  // 如果都不存在，那么浏览器有问题，则返回false
  return false

})()

export function prefixStyle(style) {
  // 边界值处理，浏览器错误的情况
  if(vendor === false){
    return false
  }
  if(vendor === 'standard'){
    return style
  }

  // 则返回，前缀 + 首字母大写+后续字母
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
