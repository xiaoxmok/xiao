/**
 * Created by xiaoxiangmin on 2017/11/30.
 */
require(['tabview','treeview'],function(tab,tree){
    var tabView = new tab.TabView(),
        treeView = new tree.TreeView();
    console.log(tabView.name);
    console.log(tabView.animate.name);
    console.log(treeView.name);
});