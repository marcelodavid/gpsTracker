const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const jasmineReporter = require('jasmine-console-reporter');
const tsProject = $.typescript.createProject("tsconfig.json");

// manejador de errores
let errorHandler = () =>
    $.plumber(function(error) {
        console.log('\t' + $.color("Error: ", 'RED') + error.messageOriginal);
        console.log('\t' + $.color("StackTrace: ", 'WHITE') + error.relativePath + $.color(" [" + error.line + "/" + error.column + "]", 'GREEN'));
        this.emit('end');
    });

// borramos el directorio temporal
gulp.task('clear', (cb) =>
    del([".tmp"], cb));

// Lint a los archivos typescripts
gulp.task('tslint', () =>
    gulp.src('angular-src/**/*.ts')
    .pipe($.tslint({
        formatter: 'prose'
    }))
    .pipe($.tslint.report({
        emitError: false
    })));

/*****************************************
 * Compilamos los archivos ts, scss y ejs *
 * ****************************************/
let tsreporter = $.typescript.reporter.nullReporter();
gulp.task('ts', ['tslint'], () =>
    gulp.src('angular-src/**/*.ts')
    .pipe(errorHandler())
    .pipe($.sourcemaps.init())
    .pipe(tsProject( /*tsreporter*/ ))
    .pipe($.plumber.stop())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    }))); // envia los cambios al navegador

gulp.task('sass', () =>
    gulp.src(['./resources/**/*.scss', 'angular-src/**/*.scss'])
    .pipe(errorHandler())
    .pipe($.sourcemaps.init())
    .pipe($.sass()) // compilar sass
    .pipe($.plumber.stop())
    .pipe($.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    }))); // envia los cambios al navegador

gulp.task('ejs', () =>
    gulp.src('views/index.ejs')
    .pipe(errorHandler())
    .pipe($.ejs({
        title: "Express"
    }, {}, {
        ext: '.html'
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    }))); // envia los cambios al navegador

// libs necesarias para angular
gulp.task('libs', () =>
    gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**'
    ], {
        cwd: 'node_modules/**'
    })
    .pipe(gulp.dest('.tmp/libs')));

gulp.task('compile', ['ts', 'sass', 'ejs']);

gulp.task('resources', () =>
    gulp.src(['resources/**', '!resources/**/*.{scss, ts}'])
    .pipe(gulp.dest('.tmp')));

/****************************
 * Test Unitarios con jasmie *
 *****************************/
let reporter = new jasmineReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4, // (0|false) (1|2|3|4 true)
    listStyle: "flat", // 'flat'|'indent'
    activity: true
});

gulp.task('test', () =>
    gulp.src('spec/*/*[sS]pec.js')
    .pipe($.jasmine({
        verbose: false,
        errorOnFail: false,
        reporter: reporter
    })));

/**********************************************************
 * Etapa de desarrollo, depuracion y debug con browserSync *
 ***********************************************************/
// observar cambio en los archivos para compilar automaticamente
gulp.task('watch', () => {
    gulp.watch('angular-src/**/*.ts', ['ts']);
    gulp.watch('./**/*.scss', ['sass']);
    gulp.watch('./views/*.ejs', ['ejs']);
    gulp.watch(['public/javascript/*.js',
        'spec/test/*.js'
    ], ['test']);
});

// ejecutamos el servidor de estaticos
gulp.task('browserSync', ['compile', 'libs', 'resources'], () => {
    browserSync({
        server: {
            baseDir: ['./', './.tmp/']
        }
    });
    // inicia posteriormente la tarea watch
    gulp.start('watch');
});


/******************************************
 * preparando los archivos para produccion *
 *******************************************/
gulp.task('sass:prod', () =>
    gulp.src(['resources/**/*.scss', 'angular-src/**/*.scss'])
    .pipe($.sass({
        outputStyle: 'compressed'
    }))
    .pipe($.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('public')));

gulp.task('js:prod', () =>
    gulp.src('./**/*.js')
    .pipe($.uglify({
        compress: true
    }))
    .pipe(gulp.dist('public')));

gulp.task('libs:prod', () =>
    gulp.src('tmp/libs/**')
    .pipe(gulp.dest('public/libs')));

gulp.task('resources:prod', () =>
    gulp.src('resources/**')
    .pipe(gulp.dist('public')));

// optimizar y desplegar
gulp.task('build', ['ts', 'sass:prod', 'js:prod', 'libs:prod', 'resources:prod', 'clean']);

gulp.task('default', ['browserSync']);
