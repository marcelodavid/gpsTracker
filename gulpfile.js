const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('stylesheets/style.scss')
        .pipe(sass())   // compilar sass
        .pipe(gulp.dest('stylesheets/'));
});

// observar cambio en style.scss para compilar automaticamente
gulp.task('watch', function(){
    gulp.watch('stylesheets/style.scss', ['sass']);    
});

gulp.task('default', ['sass']);
