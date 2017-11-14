var gulp = require ('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    clean = require('gulp-clean'),
    del = require('del'),
    notify = require("gulp-notify"),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    bower = require('gulp-bower'),
    replace = require('gulp-replace');
gulp.task('default',['less','copy','lib','copy-slick-font','copy-slick-less','copy-slick-add','copy-slick','imagemin','coffee','fileinclude','connect','watch']);
gulp.task('clean', done => {
    del(['./css/style.css']).then(paths => {
        done()
    })
});
gulp.task('copy', function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('build/js/'))
});

gulp.task('copy-slick', function() {
    gulp.src(['bower_components/slick-carousel/slick/slick.js'])
        .pipe(gulp.dest('build/js/'))
});
gulp.task('copy-slick-less', function() {
    gulp.src(['bower_components/slick-carousel/slick/slick.css','bower_components/slick-carousel/slick/slick-theme.css'])
        .pipe(concat('slick.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('copy-slick-font', function() {
    gulp.src(['bower_components/slick-carousel/slick/fonts/*'])
        .pipe(gulp.dest('build/css/fonts'))
});
gulp.task('copy-slick-add', function() {
    gulp.src(['bower_components/slick-carousel/fonts','bower_components/slick-carousel/slick/ajax-loader.gif'])
        .pipe(gulp.dest('build/css'))
});
gulp.task('bower', function() {
    return bower();
});
gulp.task('less', [ 'clean' ], function () {
    gulp.src('./dev/less/style.less')
        .pipe(plumber({
            errorHandler (err) {
                notify.onError('Error: <%= error.message %>')(err)
                this.emit('end')
            }
        }))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(notify('Finished: <%= file.relative %>'));
});
gulp.task('connect',function(){
    connect.server({
        port: 1488,
        livereload: true,
        root: 'build/'
    });
});
gulp.task('imagemin', function() {
    return gulp.src('./dev/img/**.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./build/img/'))
});
gulp.task('fileinclude', function() {
    gulp.src(['./dev/templates/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build/'));
});
gulp.task('html', function () {
    gulp.src('build/*.html')
        .pipe(connect.reload());
});
gulp.task('css', function () {
    gulp.src('build/css/*.css')
        .pipe(connect.reload());
});
gulp.task('coffee', function() {
    gulp.src('./dev/js/coffee/*.coffee')
        .pipe(concat('coffee.js'))
        .pipe(coffee())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('lib', function() {
    gulp.src('./dev/js/lib/*.js')
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./build/js/'));
});
gulp.task('watch',function(){
    gulp.watch('dev/img/**.*',['imagemin']);
    gulp.watch('dev/js/coffee/*.coffee',['coffee']);
    gulp.watch('dev/less/*/*.less',['less']);
    gulp.watch('dev/chunks/**',['fileinclude']);
    gulp.watch('dev/templates/*.html',['fileinclude']);
    gulp.watch(['build/*.html'], ['html']);
    gulp.watch(['build/css/*.css'], ['css']);
});