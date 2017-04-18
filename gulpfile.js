var gulp = require("gulp");
var minify = require('gulp-minify-css');
var $ = require('gulp-load-plugins')();

/*
* less
* */
gulp.task('copyless',function(){

    gulp.src(['less/*.less','!less/_*.less'])
        .pipe($.less())
        .pipe(minify())
        .pipe(
            gulp.dest('css/')
        )
        .pipe($.connect.reload());//通知浏览器重启
});

/*
*监听cartoc -- js
* */
gulp.task("watchjs", function () {

    gulp.src(
        [
            'js/*.js',
            '!js/*.tmp.js'

        ]
    )////指定要处理的文件
        //.pipe(
        //    $.babel({
        //        presets:['es2015']
        //    })
        //)
        //.pipe($.concat('main.js'))//把多个js文件合并成一个js文件
        .pipe($.uglify())          //对合并后的main.js文件进行压缩
        .pipe(
            gulp.dest('build/')
        )
        .pipe($.connect.reload());//通知浏览器重启

    //--2-concat--
    //gulp.src(
    //    [
    //        'js/threeMenuLinkCode.js',
    //        'js/sydcar_listdata.js',
    //        'js/sydcar_loan.js',
    //        'js/template.js',
    //        'js/cd_index.js',
    //        'js/base64.js'
    //    ]
    //    )////指定要处理的文件
    //    //.pipe(
    //    //    $.babel({
    //    //        presets:['es2015']
    //    //    })
    //    //)
    //    .pipe($.concat('main.js'))//把多个js文件合并成一个js文件
    //    .pipe($.uglify())          //对合并后的main.js文件进行压缩
    //    .pipe(
    //        gulp.dest('build/')
    //    )
    //    .pipe($.connect.reload());//通知浏览器重启

});

/**
 * tmod
 * */
gulp.task("tmod", function () {
    var stream = gulp.src("template/**/*.html")
        .pipe(
            $.tmod({
                templateBase: "template/"
            })
        )
        //.pipe($.uglify())
        .pipe(
            gulp.dest("js")
        )
        .pipe($.connect.reload());//通知浏览器重启
    return stream;
});

/*
 * watch 监听
 * ['*.html', 'less/*.less', 'template/*.html', 'js/*.js'],
 * */
gulp.task('watch',function(){
    gulp.watch(
        ['less/*.less','*.html','template/*.html','js/*.js'],
        ['copyless','tmod','watchjs']
    );

});

/*
 *本地服务
 * */
gulp.task('server', function () {
    $.connect.server({
        root:'./',
        port:8080,
        livereload:true//启动实时刷新功能
    });
});

gulp.task('default',['watch','server']);//运行此任务的时候会在8080上