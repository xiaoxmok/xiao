/**
 * Created by xiaoxiangmin on 2017/6/1.
 */
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.redirect('/index.htm');
    });
    app.get('/:page', function (req, res, next) {
        var page = req.params.page;
        //add for fetch static page.
        if(page.slice(-5) == '.html'){
            res.render(page);
            return;
        }
        if(page.slice(-4) != '.htm'){
            next();
            return;
        }
        page = page.slice(0, -4);
        var path = page;
        var map = {
            "index": "Express"
        };
        res.render(page, { title: page , header_title: map[path]});
    });
    app.get('/:channel/:sub/:page', function (req, res, next) {
        var channel = req.params.channel;
        var sub = req.params.sub;
        var page = req.params.page;

        //add for fetch static page.
        if(page.slice(-5) == '.html'){
            var path = channel + "/" + sub + "/" + page;
            res.render(path);
            return;
        }
        if(page.slice(-4) != '.htm'){
            next();
            return;
        }
        page = page.slice(0, -4);
        res.render(channel + "/" + sub + "/" + page, { title: page });
    });
    app.get('/:channel/:page', function (req, res, next) {
        var channel = req.params.channel;
        var page = req.params.page;
        //add for fetch static page.
        if(page.slice(-5) == '.html'){
            res.render(channel + "/" + page);
            return;
        }
        if(page.slice(-4) != '.htm'){
            next();
            return;
        }
        page = page.slice(0, -4);
        var path = channel + "/" + page;

        var map = {
            "index/index": "Express"
        };
        console.log(path);
        res.render(path, { title: channel + "-" + page, channel: channel, page: page, header_title: map[path] });
    });




};
