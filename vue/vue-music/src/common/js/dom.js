// 增加样式
export function addClass(el, className){
  if(hasClass(el, className)){
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}
// 是否存在样式
export function hasClass(el, className){
  let reg = new RegExp('(^|\\s)'+className + '(\\s|$)')
  return reg.test(el.className)
}


// 获取dom属性的值
export function getData(el, name, val){
  const prefix = 'data-';
  name = prefix + name;

  if(val){
    return el.setAttribute(name, val)
  }else{
    return el.getAttribute(name, val)
  }
}
