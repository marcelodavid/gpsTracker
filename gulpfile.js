const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('sass', function(){
    return gulp.src('stylesheets/style.scss')
        .pipe(sass())   // compilar sass
        .pipe(gulp.dest('stylesheets/'))
        .pipe(reload({ stream:true })); // envia los cambios al navegador
});

// observar cambio en style.scss para compilar automaticamente
gulp.task('watch', function(){
    gulp.watch('stylesheets/style.scss', ['sass']);    
});

// ejecutamos el servidor de estaticos
gulp.task('server',['sass'], function(){
    browserSync({
        server:{
            baseDir: ['stylesheets', 'views']
        }    
    });    
    // inicia posteriormente la tarea watch
    gulp.start('watch');
});

gulp.task('default', ['sass']);
