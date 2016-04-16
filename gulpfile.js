// /////////////////////////////////
// Required
// /////////////////////////////////

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// /////////////////////////////////
// HTML Task
// /////////////////////////////////

gulp.task('html', function() {
    gulp.src('**/*.html')
        .pipe(plumber())
        .pipe(reload({stream: true}));
});

// /////////////////////////////////
// Style Task
// /////////////////////////////////

gulp.task('styles', function() {
    gulp.src('scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(
            {
                browers: ['> 1%']
            }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({stream:true}));
});

// /////////////////////////////////
// Scripts Task
// /////////////////////////////////

gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
});

// /////////////////////////////////
// Browser Sync
// /////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

// /////////////////////////////////
// Watch Task
// /////////////////////////////////

gulp.task('watch', function() {
    gulp.watch('**/*.html', ['html']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
});

// /////////////////////////////////
// Default Task
// /////////////////////////////////

gulp.task('default', ['html', 'styles', 'scripts', 'browser-sync', 'watch']);