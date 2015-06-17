var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
var rework = require('rework');
var npmRework = require('rework-npm');
var path = require('path');
var fs = require('fs');
var mkpath = require('mkpath');

var PATHS = {
    src: {
        root: 'src',
        js: 'src/**/*.ts',
        html: 'src/**/*.html',
        css: 'src/**/*.css'
    },
    lib: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/angular2/node_modules/zone.js/dist/zone.js',
        'node_modules/angular2/node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/reflect-metadata/Reflect.js.map',
        'bower_components/jquery/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ]
};

gulp.task('clean', function(done) {
    del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)

        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(traceur({
            sourceMaps: true,
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(sourcemaps.write('.', {sourceRoot: PATHS.src.root}))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});


gulp.task('css', function () {
    return gulp.src(PATHS.src.css).pipe(gulp.dest('dist'));
});

gulp.task('libs', ['angular2'], function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {

    var buildConfig = {
        paths: {
            "angular2/*": "node_modules/angular2/es6/prod/*.js",
            "rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
        },
        meta: {
            // auto-detection fails to detect properly here - https://github.com/systemjs/builder/issues/123
            'rx': {
                format: 'cjs'
            }
        }
    };

    var Builder = require('systemjs-builder');
    var builder = new Builder(buildConfig);

    builder.build('angular2/router', 'dist/lib/router.js', {});
    return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('play', [ 'default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.css, ['css']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['js',  'css', 'html',  'libs']);
