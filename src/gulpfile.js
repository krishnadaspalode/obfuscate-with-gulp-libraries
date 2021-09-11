var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var minify = require('gulp-minify');
var gnirts = require('gulp-gnirts');
var htmlmin = require('gulp-htmlmin');
var javascriptObfuscator = require('gulp-javascript-obfuscator');
var jshint = require('gulp-jshint');
var obfuscatorSettings = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    identifiersPrefix: '',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 0.75,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
};


gulp.task('obfuscate-app', function () {
    del.sync(['min.js',], {force: true});     // to delete previous compiled data
    gulp.src(['app/app.js', 'app/**utils**/**/*.js'])       //read all js files in the application
        .pipe(sourcemaps.init())
        .pipe(concat('min.js'))
        .pipe(uglify({ mangle: true, compress: true }))     //uglify
        .pipe(sourcemaps.init())
        .pipe(concat('min.js'))                             //concatenate the files
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true,
            mangle: true
        }))                                                 //minify the code
        .pipe(gnirts())
        .pipe(sourcemaps.init())
        .pipe(concat('min.js'))
        .pipe(javascriptObfuscator(obfuscatorSettings))     //obfuscate the code
        .pipe(rename('min.js'))                             //renaming the code
        .pipe(gulp.dest('www/app'));                        //place to www output directory
});


gulp.task('build', [ 'obfuscate-app']);


//Execute 'gulp build' command from terminal to generate build biles