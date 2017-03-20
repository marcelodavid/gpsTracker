const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify'); // minifica el javascript para produccion
const plumber = require('gulp-plumber'); // agrega sistemas de catch de errores
const jasmine = require('gulp-jasmine'); // for unitary test
const jasmineReporter = require('jasmine-console-reporter');

gulp.task('sass', () => 
    gulp.src('./public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())   // compilar sass
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/stylesheet'))
    .pipe(reload({ stream: true }))); // envia los cambios al navegador

gulp.task('sass:prod', () =>
    gulp.src('./public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('./public/dist/stylesheets')));

gulp.task('js', () => 
    gulp.src('public/javascript/*.js')
    .pipe(plumber())
    .pipe(uglify({ compress: true}))
    .pipe(gulp.dist('./public/dist/jasvascript')));

// transpilar archivos ejs
gulp.task('ejs', () => 
    gulp.src('views/index.ejs')
    .pipe(plumber())
    .pipe(ejs({title:"Express"}, {}, {ext:'.html'}))
    .pipe(gulp.dest('./.tmp/'))
    .pipe(reload({ stream: true }))); // envia los cambios al navegador

// observar cambio en style.scss para compilar automaticamente
gulp.task('watch', () => {
    gulp.watch('./public/stylesheets/style.scss', ['sass']);    
    gulp.watch('./views/index.ejs', ['ejs']);
});

// ejecutamos el servidor de estaticos
gulp.task('browserSync',['sass', 'ejs'], () => {
    browserSync({
        server:{
            baseDir: ['./', './.tmp/']
        }
    });    
    // inicia posteriormente la tarea watch
    gulp.start('watch');
});

// testing 
let reporter = new jasmineReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4,   // (0|false) (1|2|3|4 true)
    listStyle: "flat",    // 'flat'|'indent'
    activity: true
});

gulp.task('test', () => 
    gulp.src('spec/*/*[sS]pec.js')
    .pipe(jasmine({
        verbose: false,
        errorOnFail: false,
        reporter: reporter
    })));

// automatic testing
gulp.task('tdd', () => {
    gulp.watch(['public/javascript/*.js', 
        'spec/test/*.js'],
        ['test']);    
});

// optimizar y desplegar
gulp.task('build', ['sass:prod', 'js']);

gulp.task('default', ['test', 'build']);
