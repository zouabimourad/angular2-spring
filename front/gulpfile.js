var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var rework = require('rework');
var npmRework = require('rework-npm');
var path = require('path');
var fs = require('fs');
var mkpath = require('mkpath');

var PATHS = {
    src: {
        root: 'src',
        ts: 'src/**/*.ts',
        html: 'src/**/*.html',
        css: 'src/**/*.css',
        fonts: 'src/fonts/*.*'
    },
    lib: [
        'node_modules/angular2/bundles/angular2.dev.js',
		'node_modules/angular2/bundles/router.dev.js',
        'node_modules/traceur/bin/traceur-runtime.js',        
        'node_modules/systemjs/dist/system.*',        
        'node_modules/systemjs/dist/system-*.*',
        'bower_components/jquery/jquery.min.js',
        'node_modules/rx/dist/rx.all.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ]
};

gulp.task('clean', function(done) {
    del(['dist'], done);
});

var tsProject = tsc.createProject('tsconfig.json', {typescript: require('typescript')});

gulp.task('ts', function () {
    return gulp.src(PATHS.src.ts)
        .pipe(plumber())        
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('source'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});


gulp.task('css', function () {
    return gulp.src(PATHS.src.css).pipe(gulp.dest('dist'));
});


gulp.task('fonts', function () {
    return gulp.src(PATHS.src.fonts).pipe(gulp.dest('dist/fonts'));
});


gulp.task('libs', function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('play', [ 'default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.ts, ['ts']);
    gulp.watch(PATHS.src.css, ['css']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['ts',  'css',  'fonts', 'html',  'libs']);
