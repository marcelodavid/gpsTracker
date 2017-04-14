const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tsProject = $.typescript.createProject('tsconfig.json', {
    module: 'system',
    outDir: '.tmp'
});
const reporters = require('reporters');

gulp.task('default', ['browserSync']);

gulp.task('clear', (cb) =>
    del([".tmp"], cb)); // limpiamos antes y despues del build

gulp.task('tslint', () =>
    gulp.src('angular-src/**/*.ts')
    .pipe($.tslint({ // lints
        formatter: 'prose'
    }))
    .pipe($.tslint.report({
        emitError: false
    })));


/* Compilamos los archivos ts, scss y ejs */

gulp.task('compile', ['ts', 'sass', 'ejs']);

gulp.task('ts', ['tslint'], () =>
    gulp.src(['angular-src/**/*.ts', '!angular-src/app/**/*[sS]pec.ts'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(tsProject())
    .pipe($.plumber.stop())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    })));

gulp.task('sass', () =>
    gulp.src(['./resources/**/*.scss', 'angular-src/**/*.scss'])
    .pipe($.plumber(reporters('gulp-sass')))
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
    .pipe($.plumber())
    .pipe($.ejs({
        title: "Express"
    }, {}, {
        ext: '.html'
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    })));

/* Librerias y recursos */

gulp.task('angular-templates', () =>
    gulp.src('angular-src/**/*.html')
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
        stream: true
    })));

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

gulp.task('resources', () =>
    gulp.src(['resources/**', '!resources/**/*.{scss, ts}'])
    .pipe(gulp.dest('.tmp')));

/* Etapa de desarrollo, depuracion y debug con browserSync */

gulp.task('browserSync', ['compile', 'libs', 'resources', 'angular-templates'], () => {
    browserSync({
        server: {
            baseDir: ['./', './.tmp/']
        }
    });
    // inicia posteriormente la tarea watch
    gulp.start('watch');
});

gulp.task('watch', () => {
    gulp.watch(['angular-src/**/*.ts', '!**/*[sS]pec.ts'], ['ts']);
    gulp.watch('angular-src/**/*.html', ['angular-templates'])
    gulp.watch('angular-src/**/*.scss', ['sass', 'angular-templates']);
    gulp.watch('resources/**/*.scss', ['sass']);
    gulp.watch('./views/*.ejs', ['ejs']);
});



/* preparando los archivos para produccion */

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

gulp.task('js:prod', ['ts'], () =>
    gulp.src(['.tmp/**/*.js'])
    .pipe($.uglify({
        compress: true
    }))
    .pipe(gulp.dist('public')));

gulp.task('libs:prod', () =>
    gulp.src('.tmp/libs/**')
    .pipe(gulp.dest('public/libs')));

gulp.task('resources:prod', () =>
    gulp.src(['resources/**', '!resources/**/*.{scss, ts}'])
    .pipe(gulp.dist('public')));

/* optimizar y desplegar */
gulp.task('build', ['sass:prod', 'js:prod', 'libs:prod', 'resources:prod']);
