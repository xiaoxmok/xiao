// 本地存储
export default {
    fetch: function(NAME){
        return JSON.parse(window.localStorage.getItem(NAME) || "[]")
    },
    save: function(NAME, items){
        window.localStorage.setItem(NAME, JSON.stringify(items))
    }
}