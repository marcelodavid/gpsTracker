const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('stylesheets/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets/'));
});

gulp.task('default', ['sass']);
