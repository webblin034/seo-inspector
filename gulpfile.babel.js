'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('Watch', () => {
    gulp.watch(['src/*.js', 'src/rules/*.js', 'tests/*.js'], ['TranspileEs6ToEs5']);
});

gulp.task('TranspileEs6ToEs5', () => {
    gulp.src('src/*.js')
        .pipe(babel({ presets: ['es2015'], plugins: ['add-module-exports'] }))
        .pipe(gulp.dest('./build/'));
    gulp.src('src/rules/*.js')
        .pipe(babel({ presets: ['es2015'], plugins: ['add-module-exports'] }))
        .pipe(gulp.dest('./build/rules'));
    gulp.src('tests/*.js')
        .pipe(babel({ presets: ['es2015'], plugins: ['add-module-exports'] }))
        .pipe(gulp.dest('./build/tests'));
});

