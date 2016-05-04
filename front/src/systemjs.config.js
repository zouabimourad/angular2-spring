/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        '@angular': 'lib/@angular'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'index.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'angular2-in-memory-web-api': {defaultExtension: 'js'},
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
        '@angular/router'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    }

    System.config(config);

})(this);
