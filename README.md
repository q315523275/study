# 浩鲸前端组项目流程规范(beta版)

## 代码流程规范

### 一、项目介绍
一、项目启动

	git clone 					//克隆项目地址

	cd <project name file>  	//进入项目

	npm i （yarn add）   		   //安装相应的依赖包

	npm run dev 				//启动项目文件

二、项目目录结构

	|--config                                  //用于生产开发的环境配置
	  |--config.js						   //用于启动项目的基础配置（勿动）
	  |--router.config.js					   //页面路由的配置都在此文件目录
	|--mock                                    //用于前端mock数据（全局数据）
	|--public								   //用于夜的公共资源的存放
	|--routes								   //该文件夹不是用于路由跳转的，而是路由鉴权（暂时没有用到）
	|—-src									   //该文件夹是项目的主工程文件夹
	  |--assets							   //存放一些静态资源
  	  |--component						   //项目中常用的业务组件放在这里
	  |--layout							   //全局布局
	  |--pages							   //页面
		|--.umi								// dev 临时目录，需添加到 .gitignore
		|--<index>						//页面内容
		|--404.js							//404页面
		|--document.ejs					//静态模版
		|--static								      //字体 css文件
		|--utils								      //常用工具方法
	|--.editorconfig
	|--.env
	|--.eslintrc
	|--.eslintignore
	|--.gitignore
	|--package.json
	|--package-lock.json
	|--readme.md
	|--webpack.config.js
	|--yarn.lock
	|--yarn-error.log
	


### 二、编码要求

  1、html篇

	在属性上，使用双引号，不要使用单引号。
	不要在自动闭合标签结尾处使用斜线 - HTML5 规范 指出他们是可选的。
	不要忽略可选的关闭标签（例如， 和 ）。
	尽量用class来渲染样式，避免用id来写样式
	尽量遵循 HTML 标准和语义，但是不应该以浪费实用性作为代价。任何时候都要用尽量小的复杂度和尽量少的标签来解决问题。
	在编写 HTML 代码时，需要尽量避免多余的父节点。很多时候，需要通过迭代和重构来使 HTML 变得更少。
2、css篇

	外部文件LINK加载CSS，尽可能减少文件数。加载标签必须放在文件的 HEAD 部分。
	避免使用内联样式
	不要在文件中用内联式引入的样式，不管它是定义在样式标签里还是直接定义在元素上。这样会很难追踪样式规则
	使用 reset.css 让渲染效果在不同浏览器中更一致。
	避免使用CSS表达式（Expression）
	不要用@import
	避免使用ID选择器
	避免使用开销大的CSS选择器 如：*
	禁止给class加上html标签 如：li.list
	避免让选择符看起来像正则表达式 如：[name='aa']
	高级选择器执行耗时长且不易读懂，避免使用。
	避免直接使用html tag作为样式选择器
	避免使用 !important
	有节制的使用css3伪元素
	避免使用css3 低效属性，如：linear-gradient，borde-image；
	使用语义化、通用的命名方式；
	使用连字符 - 作为 Class 名称界定符，不要驼峰命名法和下划线；
	避免选择器嵌套层级过多，尽量少于 3 级；
	声明顺序
	这是一个选择器内书写CSS属性顺序的大致轮廓。这是为了保证更好的可读性和可扫描重要。

	作为最佳实践，我们应该遵循以下顺序（应该按照下表的顺序）：

	结构性属性：
	display
	position, left, top, right etc.
	overflow, float, clear etc.
	margin, padding
	表现性属性：
	background, border etc.
	font, text

2.1、公共样式说明（<font color="red">新加</font>）

在书写页面的过程中，我们会经常用到一些共用的样式，像一像素的需求。在很多item当中会需要一像素作为分割，如果大量重复书写相同的样式，不仅仅维护成本大。而且不易控制。为此，我将常用的样式放到了mixin.scss文件中。由于，我们项目中使用的是scss。共用的样式，大家必须要用学会提取，定义好 @minxin



3、javascript篇

**声明**： *由于js的编码规范比较多 比较杂。为了精简该规范的篇幅。我将js的编码规范都写到了配置文档（.eslintrc）里面，任何不得删改其中的文件，如果有特殊需求的话，需告知团队里面其他人，待大家一同确认过后，方可修改。也不得擅自修改webpack.config.js的文件内容。*

 要求：

	es6标准
	规则已经在eslint中配置好 请大家遵守
	切勿修改.eslint文件

### 三、项目文件详解

1、项目组件

	components
	|--list
		|--index.jsx
		|--style.scss

该文件夹下面，放置一些页面上面共用的组件，比如titile等等，主要是一些页面重复度比较高的组件，放到这里面书写

2、UI组件库(筹)

	UIcomponent
	|--UIModal
		|--index.jsx
		|--style.scss
	|--UIPicker
该文件夹下面，放置的是一些不同项目里常用的组件，比如弹出框，对话框，轻提示等等，也就是我们常说的轮子。欢迎大家造轮子，或者将一些成熟的解决方案放入里面。便捷化我们日后的开发。


 3、工具类库

 	utils:
 	|--history.js
 	|--htpps.js
 	|--upload.js
 	|--tools.js

由于在日常的开发当中，会大量使用到重复的方法，如（ajax的方式，判断是否为空，判断电话号码等等）。为了方便大家的开发，也同时为了统一管理，所以，我将一些共用的方法都放到这里了，请大家仔细阅读，切勿写重复的方法。

4、页面（重要 重要 重要！！！）

	pages
	|--home
		|--images								//放置一些页面中使用的静态资源
		|--page-components						//页面里面的组件
		|--_mock.js								//用于模拟当前页面数据
		|--service.jsx							//ajax请求
		|--index.jsx							//页面组件
		|--model.js								//数据管理器（todo）
		|--style.scss							//样式
该文件夹下面放置了大量的页面组件，每个页面因为自身的样式不同，文件夹里面的内容会有些许不同。
重要的是index.jsx里面注意以下几点：

* 由于我们的项目是SPA 所以页面的类名不允许重复（这点很重要）
* 页面最外层的div必须加className与类名相同(如style.index)
* 解析赋值的时候 必须使用es6语法 减少页面的长度 增加可读性
* 一个页面代码行数，本质不允许超过200行，如遇特殊情况，坚决不许超过300行。如果有特殊需求，到时候一起讨论解决办法

5、通用方法说明（<font color="red">新加</font>）

由于在项目的开发当中，会有大量重复的方法需要使用，比如判断是否登录，是否是安卓手机，是否是正确的手机号。为了方便管理及统一维护，我将所有的方法放到了同一个文件下面就是utils目录下tools.js文件中。调用方式如下：

	//引入
	import { Tools } from 'utils/tools'

	//调用方法
	Tools.isMobile(bankPhone)

6、命名规则

1、变量 小驼峰命名法

	let initAmount = 0 //

2、常量 名称全部大写

	const LOGIN_IN_OTHER_DEVICE = -1

3、函数 小驼峰式命名法

	const isLogin = () => {}

4、类 & 构造函数

	class Person {}

	function Person(){}

5、注释

	code // 单行注释

	/* 多行注释 */
	fn()

	/**
	* 函数说明
	* @params
	*/

	show(params) {
		console.log(params
	}

## 开发与解决bug流程规范

### 一、开发流程

* 代码书写完成之后，需要自测！！！不可未进行自测就交予QA
* 代码交与QA之后，需要集体code review
* QA测出bug时候，样式问题靠后解决。逻辑bug优先解决
* 每次新添代码或者删改代码，遇到大的逻辑变动也需要有全体人员的code review


### 二、解决bug流程

* 如遇bug无论线上还是测试环境，先找到bug的提出人，询问其机型设备。先复现问题。
* 有可靠的解决，且影响较小的改动，可以直接改掉，转交QA测试。
* 如果影响较大的bug,需要集体讨论。再做修改。
* 如果遇到线上问题，需要紧急修改。应先放下手中的事情，全力支持排查bug
* 对与线上的bug一定要总结回顾，考虑已经售出的系统当中是否存在同样的问题，如果有，及时反馈并解决







ps: （持续完善中，有好的建议，欢迎补充！）

