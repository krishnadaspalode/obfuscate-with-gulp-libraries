<p align="center">
  <a href="https://github.com/krishnadaspalode/obfuscate-with-gulp-libraries" target="_blank">
    <img src="https://github.com/krishnadaspalode/obfuscate-with-gulp-libraries/blob/main/assets/logo.png" alt="" title="" width="80">
    <br/>
    <h2 align="center">Advanced Javascript Code Obfuscation With Gulp Obfuscation Libraries</h2>
  </a>
</p>
<br/>
Javascript compiled code which gets rendered in browser is always having a threat/security concerns. It can reveal the underline source code and an attacker can easily exploit our application stability. Javascript client based applications can overcome this by obfuscating compiled code to non-readble/parsable formats. We have many libraries to achieve the same.

<h3 align="center">Javascript Gulp Libraires</h3>

Gulp tasks carry out read files from file system and do support modify the files and write into destination.
<br/>
<p align="center">
    <img src="https://github.com/krishnadaspalode/obfuscate-with-gulp-libraries/blob/main/assets/gulp.png" alt="" title="" width="80%">
</p>
<br/>
Gulp libraries are capable of combining files then uglify, minify, obfuscate and write as in readbale format to destination
<br/>
<p align="center">
    <img src="https://github.com/krishnadaspalode/obfuscate-with-gulp-libraries/blob/main/assets/gulp-architecture.png" alt="" title="" width="80%">
</p>


## 📢 Result
<p align="center">
    <img src="https://github.com/krishnadaspalode/obfuscate-with-gulp-libraries/blob/main/result/result.png" alt="" title="" width="80%">
</p>

Gulp feature basically performing wrapping up of all the JS files, html files, CSS/SCSS files in the code base to mnified files. The minfied file will not be readable or parsable as given above.

## 🛠 Installation & Set Up

Make sure apprpriate node and npm versions are already installed in the system.

*   Install gulp globally 
```sh
npm install --global gulp-cli
```
and to install gulp package in application dev dependencies
```sh
npm install --save-dev gulp
```

*   I used version gulp CLI version: 2.3.0 & Local version: 3.9.1 here. my devDependencies are as below in package.json file,

```sh
"devDependencies": {
    "del": "^2.2.1",
    "gulp": "^3.9.1",
    "gulp-angular-templatecache": "^2.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-gnirts": "^1.0.2",
    "gulp-htmlmin": "^2.0.0",
    "gulp-javascript-obfuscator": "^1.1.2",
    "gulp-jshint": "^2.0.4",
    "gulp-minify": "^1.0.0",
    "gulp-rename": "^1.2.2",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-uglify": "^1.5.4",
    "gulp-watch": "^4.3.8",
    "http-server": "^13.0.1",
    "jshint": "^2.9.4"
  }
```

*   We can use a gulpfile.js to read application files from it's paths and combine them to minified files to place in www output directory.

*   Gulpfile.js:

```sh
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
```

*   Gulp javascript code obfuscator have many properties. We can choose required/comptable properties for our application. The properties defines the code obfuscation level in our application. I selected below properties for obfucator,
```sh
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
}
```

The library reference URL have all the properties here: https://github.com/javascript-obfuscator/javascript-obfuscator



*   gulp task can written to carry out the codebase modifications such as minify, concatenate, uglify, obfuscate and finally place minified js file to www path

```sh
gulp.task('obfuscate-app', function () {
    del.sync(['min.js',], {force: true})                   // to delete previous compiled data
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

```

Here in this example, only js files are collected and obfuscated. Similarly we can modify html and css/scss files.

* The gulp task can be invoked to generate obfuscated min.js into path www/ from terminal : 

```sh
gulp build
```

Attached sample gulpfile.js and generated min.js files in src folder for reference.


## 💖 Support

If you are using this project and happy with it or just want to encourage me to continue creating stuff, you can do it by just starring and sharing the project.


## 💡 Contributing

Any contributors who want to make this project better can make contributions, which will be greatly appreciated. To contribute, clone this repo locally and commit your code to a new branch. Feel free to create an issue or make a pull request.