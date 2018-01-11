seajs.config({
    base: "http://fe.wt.com/js/",
    alias: {
        "jquery": "public/jquery.js",
        "header": "sc/v/pub-header.js"
    }
});
seajs.use(["jquery", "header"], function($, header) {
    $(function() {
        header.header();
    });
});