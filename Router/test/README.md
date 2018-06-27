#### 利用JS实现前端路由

1. Router是一个路由类，类属性routes是一个路由映射对象，currentURL表示当前的URL
1. 类函数route表示为对应的url指定视图函数，refresh函数为刷新页面函数
1. 为window绑定监听函数，其中主要绑定hashchang，以检测到hash值变了，马上刷新页面。