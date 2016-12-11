'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');

var path = {
    build: {
        css: 'css'
    },
    src: {
        css: 'sass/sevendie.scss'
    },
    watch: {
        css: 'sass/**/*.*'
    },
    clean: './css'
};

gulp.task('cssOwn:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            compress: true,
            'include css': true
        }))
        .pipe(prefixer({
            browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        }))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('css:build', [
    'cssOwn:build'
]);

gulp.task('build', [
    'css:build'
]);

gulp.task('watch', function(){
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
});

gulp.task('default', ['build', 'watch']);
