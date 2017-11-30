/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
define(['animate'],function(a){
    function TabView(){
        this.name = "TabView";
        this.animate = new a.Animate();
    };
    return {TabView:TabView};
});