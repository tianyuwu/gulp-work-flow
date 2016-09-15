var module_name = 'module1';   //监听的模块名
var dev_path = './src';        //资源目录
var build_path = './static';   //资源输出目录


//gulp插件
var fs = require('fs'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),  //css压缩
	rename = require('gulp-rename'),
    watch = require('gulp-watch'),    //gulp.watch不能监听新增文件
    babel = require('gulp-babel'),
    clean = require("gulp-clean"),    //清理目录
    uglify = require('gulp-uglify');


var path = dev_path + '/' + module_name,
    sasspath = path + '/scss/**/*.scss',
    jspath = path + '/js/**/*.js',
    htmlpath = './src/views/**/*.html',
    ifonpath = './src/webfont/**';

var disPath = build_path + '/' + module_name,
    disCssPath =  disPath + '/css',
    disJsPath = disPath + '/js',
    disHtmlPath = './Application/Home/View',
    disifonpath = './static/webfont';


//编译sass
gulp.task('sass', function(){
    return gulp.src(sasspath)
    .pipe( watch(sasspath))   //监听gulp.watch不能监听新增文件
    .pipe( sass() )  //编译sass
    .pipe( autoprefixer())  //添加浏览器前缀
    .pipe( gulp.dest(disCssPath) )
    .pipe( cssnano() )
    .pipe( rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe( gulp.dest(disCssPath) );
});


//编译js
gulp.task('js',function(){
    return gulp.src(jspath)
    .pipe( watch(jspath))
    .pipe(babel({
      presets: ['es2015','stage-3']
    }))  //babel转码
    .pipe( gulp.dest(disJsPath) )
    .pipe(uglify())  //压缩
    .pipe( rename({suffix: '.min'}))
    .pipe( gulp.dest(disJsPath) );
});


//监听
gulp.task('watch',function(){
    gulp.watch(sasspath,['sass']);
});


//构建目录清理
gulp.task("clean", function (done) {
    //return cache.clearAll(done);
    return gulp.src(disPath, {
        read: false
    })
    .pipe(clean({force: true}));

})


//新模块开发脚手架
gulp.task("new",function(){
    console.log('NEW MODULE:',path); 
	mkdirs(path);
	mkdirs(path +'/scss');
	mkdirs(path +'/js');
	mkdirs(path +'/img');
})



//默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function () {
    gulp.start('sass', 'js');
});


//创建文件夹
function mkdirs(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true; 
}