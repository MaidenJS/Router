(function () {

    'use strict';

    /**
     * Dependencies
     */
    var paths = require('./gulp.config.json');
    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var gutil = require('gulp-util');
    var notify = require('gulp-notify');
    var sass = require('gulp-sass');
    var phpunit = require('gulp-phpunit');
    var bytediff = require('gulp-bytediff');
    var gulpif = require('gulp-if');
    var argv = require('yargs').argv;
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var ngAnnotate = require('gulp-ng-annotate');

    /**
     * @type {{prod: *, dev: (*|.karma.dev|dev|nv.dev)}}
     */
    var taskConstants = {
        "prod": argv.prod,
        "dev": argv.dev
    };

    /**
     * Building js, less, vendorjs etc...
     */
    gulp.task('build', [
        'vendorjs',
        'js',
        'sass'
    ]);

    /**
     * Task: vendorjs
     */
    gulp.task('vendorjs', function() {
        gulp.src(paths.vendorjs)
            .pipe(gulpif(taskConstants.dev, sourcemaps.init()))
            .pipe(concat(paths.build.files.vendorjs))
            .pipe(bytediff.start())
            .pipe(gulpif(taskConstants.prod, uglify()))
            .pipe(bytediff.stop())
            .pipe(gulpif(taskConstants.dev, sourcemaps.write()))
            .pipe(gulp.dest(paths.build.folder));
    });

    /**
     * build js
     */
    gulp.task('js', function () {
        gulp.src(paths.js)
            .pipe(gulpif(taskConstants.dev, sourcemaps.init()))
            .pipe(concat('app.js'))
            .pipe(bytediff.start())
            .pipe(ngAnnotate())
            .pipe(gulpif(taskConstants.prod, uglify()))
            .pipe(bytediff.stop())
            .pipe(gulpif(taskConstants.dev, sourcemaps.write()))
            .pipe(gulp.dest(paths.build.folder))
    });

    /**
     * Task: SASS
     */
    gulp.task('sass', function()
    {
        gulp.src('public/app/styles/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass()).on('error', gutil.log)
            .pipe(concat('main.css'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('public/app/styles'))
            .pipe(notify('CSS compiled!'));
    });

    /**
     * Task: PHPUNIT
     */
    gulp.task('phpunit', function()
    {
        var options = {
            debug: false,
            notify: false
        };

        gulp.src('app/tests/*.php')
            .pipe(phpunit('', options))
            .on('error', notify.onError({
                title: 'PHPUnit Failed',
                message: 'One or more tests failed, see the cli for details.'
            }))
            .pipe(notify({
                title: 'PHPUnit Passed',
                message: 'All tests passed!'
            }));

    });

    /***************************** Watchers ***********************************/

    /**
     * Watch for changes in app, less, vendor dependencies & compile new dependency as necessary.
     */
    gulp.task('watch', function() {
        gulp.watch('public/app/scripts/**/*.js', ['js']);
        gulp.watch('gulp.config.json', ['vendorjs', 'vendorcss']);
        gulp.watch('public/app/styles/**/*.scss', ['sass']);
        gulp.watch('app/**/*.php', ['phpunit']);
    });

    /**
     * Default Task
     */
    gulp.task('default', ['watch']);

})();