// 封装一个函数，参数是定时器的时间，.then执行回调函数。

function sleep(time){
    return new Promise((resolve)=>{
        setTimeout(resolve,time)
    })
}

sleep(5000).then((res)=>{
    console.log('呵呵')
})