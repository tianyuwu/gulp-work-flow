## gulp-work-flow 前端工作流，原来可以这么简单！
### 概述
可能很多开发者像我一样依然还服务于传统的MVC架构的项目，这些项目的特点是html页面由后台渲染，前端工程师和后端工程师在一个工程中和（si）谐（bi）的生活着，前端开发简单而又轻松，拼拼页面，写写特效，可能还会用用后端语法渲染下数据。那么问题来了，我想用sass或者less怎么办？我想写ES6怎么办？js文件太大需要压缩怎么办？现在，这些问题将统统可以解决。
### Gulp
gulp是nodejs的一个扩展库，是一个自动化的构建工具，它的优势是拥有丰富的插件，利用插件我们可以实现像sass编译，ES6转换为ES5等各种前端工作。API不多，只有简单的几个函数，官方有简洁友好的中文跟文档。

- [gulp快速入门](http://www.gulpjs.com.cn/docs/getting-started/)
- [gulpAPI文档](http://www.gulpjs.com.cn/docs/api/)

### css处理
处理前

```
.container {
    display: flex;
}
```

处理后
```
.container{display:-webkit-box;display:-ms-flexbox;display:flex}
```
![](http://ww3.sinaimg.cn/large/7853084cgw1f7u645r0kdg20hd0ev43v.gif)
### ES6处理
处理前
```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var b = new Point(400,500);
b.toString()
```
处理后
```
"use strict";function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),Point=function(){function n(t,e){_classCallCheck(this,n),this.x=t,this.y=e}return _createClass(n,[{key:"toString",value:function(){return"("+this.x+", "+this.y+")"}}]),n}(),b=new Point(400,500);b.toString();
```

![](http://ww1.sinaimg.cn/large/7853084cgw1f7u6eppxl4g20hy0daqbk.gif)

### 环境部署
1.请确保您已经安装好了Nodejs,如果没安装可以[点击安装](http://nodejs.cn/)

2.全局安装gulp
```
npm install gulp -g
```

3.把本项目克隆下来,如果您安装了git可以使用`clone`命令
```
git clone https://github.com/tianyuwu/gulp-work-flow
```
当然也可以点击右上角`Clone or download`->`Download ZIP`

4.把项目中除static外的目录复制到您的项目中

### 目录结构

```
├── gulpfile.js
├── package.json
├── src          //资源目录,开发时在这边创建文件
│   └── module1   //模块1
│       ├── img    
│       ├── js     //js目录
│       └── scss   //sass文件目录
└── static       //编译输出目录，一般对应项目中的静态资源目录，html中引用资源时需要填写的目录
    └── module1   //资源中模块编译好后会在此生成对应的目录
        ├── css
        └── js
```

传统的MVC架构的应用会有一个独立的静态资源目录，目录中集中放置项目所有模块的js,css,图片资源，所以我们要做的就是将写好的sass文件和es6规则的js文件输出到该目录下就好啦
### 上手指南

#### 安装所有的依赖
```
npm init
```

#### 修改gulpfile.js
将module_name改为你项目中对应的模块名，可以天下一个新的不存在的模块，build_path也改为你项目中对应的输出目录
```
var module_name = 'module1';   //监听的模块名
var dev_path = './src';        //资源目录
var build_path = './static';   //资源输出目录
```
如果是一个新的模块，可以执行`gulp new`快速创建该模块及模块下的子目录
```
gulp new
```

#### 执行gulp
```
gulp
```

#### 尽情的挥洒sass和es6吧




