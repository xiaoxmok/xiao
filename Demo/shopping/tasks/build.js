import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('build', gulpSequence('clean', 'css', 'pages','img','json','ttf','scripts', ['browser', 'server']));