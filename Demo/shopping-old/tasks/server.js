import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('server', (cb) => {
    if (!args.watch) return cb();

    var server = liveserver.new(['--harmony', 'prod.server.js']);
    server.start();

    gulp.watch(['dist/**/*.js','dist/!**!/!*.html'],function(file){
        server.notify.apply(server,[file])
    })

    gulp.watch(['server/routes/!**/!*.js','server/src.js'],function(){
        server.start.bind(server)()
    })
})