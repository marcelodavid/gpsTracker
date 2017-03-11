const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify'); // minifica el javascript para produccion
const plumber = require('gulp-plumber'); // agrega sistemas de catch de errores

gulp.task('sass', function(){
    return gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())   // compilar sass
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/.tmp'))
        .pipe(reload({ stream:true })); // envia los cambios al navegador
});

gulp.task('sass:prod', function(){
    return gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest('public/dist/stylesheets'));
});

gulp.task('js', function(){
    return gulp.src('public/javascript/*.js')
        .pipe(plumber())
        .pipe(uglify({ compress: true}))
        .pipe(gulp.dist('public/dist/jasvascript'));
});

// observar cambio en style.scss para compilar automaticamente
gulp.task('watch', function(){
    gulp.watch('public/stylesheets/style.scss', ['sass']);    
});

// ejecutamos el servidor de estaticos
gulp.task('server',['sass'], function(){
    browserSync({
        server:{
            baseDir: ['public/stylesheets', 'views']
        }    
    });    
    // inicia posteriormente la tarea watch
    gulp.start('watch');
});

// optimizar y desplegar
gulp.task('build', ['sass:prod', 'js']);

gulp.task('default', ['sass']);
