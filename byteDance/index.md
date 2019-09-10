### CSS
* 解释 css 各种定位,absolute 相对于谁定位；  
-> position: relative/absolute/fixed/static/inherit/initial/unset/sticky  
-> 相对于最近一层position非static的父元素  
-> relative不会脱离文档流

* iframe 中的 fixed 定位和什么有关，怎么固定浏览器窗口  
-> iframe窗口非浏览器窗口，通过postmessage通信将top页面的scrolltop传递给iframe，iframe内部通过监听通讯事件动态设置元素的定

* transfrom 的主要用法
-> transform用来向元素应用各种2D和3D转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜等操作,有translate, scale, rotate, skew, 

* flex 盒子布局
[flex 布局详解](https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb)

* 不同高的子盒子实现头部对齐
```
// 1. padding 补偿
.parent {
    width: 100%;
    overflow: hidden;
}
.left, right {
    float: left;
    padding-bottom:9999px;
    margin-bottom:-9999px;
}
// 2. flex 布局
.parent{
    display: flex;
}
```

* css 盒模型；
-> 标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin -> box-sizing:content-box;
-> 低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin -> box-sizing:border-box;;


* 重绘和回流的区别
-> 重绘(repaint)：当render tree中的一些元素需要更新属性，单这些属性只会影响元素的外观，风格，而不会影响到元素的布局，此类的页面渲染叫作页面重绘。
-> 回流(reflow)：当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而引起的页面重新渲染。
-> 回流必将引起重绘，而重绘不一定会引起回流


* 如何解决外边距重合问题;
-> 外边距重叠是指两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界
外层元素添加padding;  
外层元素 overflow:hidden;  
外层元素透明边框 border:1px solid transparent;  
内层元素绝对定位 postion:absolute;  
内层元素 加float:left;或display:inline-block;  


* 清除浮动
1、父级div定义 `overflow: auto;`;  
2、.clearfix

* 两列布局(右侧定宽200px,左边随屏幕自动填充宽度)
```
// 1. float+margin(一侧定宽，一侧自动)  
// 2. position+margin(一侧定宽，一侧自动)
// 3. float+负margin(一侧定宽，一侧自动)
.right { 
    float:left; 
    width: 100%;
}
.right .cont {
    margin-left:200px;
}
.left {
    float: left; 
    width: 200px; 
    margin-left: -100%; 
}
```

* 三列布局
```
// 1. float+margin（两侧定宽，中间自适应）
// 2. position+margin（两侧定宽，中间自适应）
// 3. float+负margin（两侧定宽，中间自适应）
.m-box { 
    float:left; 
    width: 100%;
}
.m-box .center {
    margin:0 200px;
}
.left,.right {
    float: left; 
    width: 200px; 
    margin-left: -100%;
}
.right {
    margin-left: -200px;
}
```

* 垂直水平居中
```
// 1、绝对定位+margin：auto  
.box {
    margin: auto;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
}

// 2、绝对定位+transform反向偏移

.box {
    margin: auto;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
}

// 3、display: flex-box

.box {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

* css 实现4:3的块元素
```
.box {
    width: 100%;
    height: 0;
    padding-top: 75%;
}
```

* css写个无限旋转动画
```
.ig{
    -webkit-animation:circle 1.5s infinite linear;
}
@-webkit-keyframes circle{
    0%{ transform:rotate(0deg); }
    100%{ transform:rotate(360deg); }
}
```

* 用css画一个三角形
```
.triangle{
    width: 0; height:0;
    border: 10px solid transparent;
    border-top-color: red;
}
```



### 简答题
* 自我介绍,项目介绍，项目中的难点以及解决方案;
* 项目中遇到的技术问题
* MVC/MVVM 的理解
* const/let 和 var 的区别
-> let 没有变量提升,不能重复声明, 不能通过window访问, 具有块级作用域 
* 关键词标记颜色 
* amd 和 cmd 规范理解；
* es6相比es5有没有什么比较好的特性 
* 箭头函数和一般函数的区别
* promise了解不
* JS的数据类型
-> number,boolean,string,undefined,null,object,symbol。
* 发http请求会怎么做
* 常见的状态码
* http缓存怎么做到的
* 浏览器缓存常见的http的头 requestHeader
* 性能优化的事情
* 打包工具 Webpack 的配置，原理，webpack优化；
-> 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
-> 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
-> 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
-> 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
-> 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
-> 输出所有chunk到文件系统。
* nodeJS
* 讲讲同源策略
* url构成，解析一个url，包括hash值；
* post和get的区别
* 事件代理是什么事件代理中target和event细节
* 原型链继承对象、构造函数、prototype、__proto_
* http1.0 ,1.1,2.0的区别；
* Object.defineProperty()的缺点；
* post content-type类型
* 然后问了冒泡，捕获；
* 手写一个闭包；
* 考察数组判定、
-> Object.prototype.toString.call(arr) === '[object Array]'
* 三个url同时请求，要求按顺序打印结果
* http缓存优缺点
* 单页应用优缺点
* 浏览器缓存优缺点
* addEventListener()有几个参数，是什么？
* typeof的类型(举例说属于什么类型)
* 问针对移动浏览器端开发页面，不期望用户放大屏幕，且要求“视口(viewport)”宽度等于屏幕宽度，视口高度等于设备高度，如何设置？
```
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, 
        maximum-scale=1, user-scalable=no">
```
* cookie是什么，怎么存储。
* cookie和session的区别；
-> cookie数据存放在客户的浏览器上，session数据放在服务器上。
-> cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗,考虑到安全应当使用session。
-> session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能,考虑到减轻服务器性能方面，应当使用COOKIE。
-> 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
* 问请描述一下cookie，sessionStorage和localStorage的区别？
-> cookie:一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效，也可设置过期时间,每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 4k
-> sessionStorage: 仅在当前会话下有效，不在不同的浏览器窗口中共享，关闭页面或浏览器后被清除 5M
-> localStorage: 除非被清除，否则永久保存,仅在客户端(即浏览器)中保存，不参与和服务器的通信 5M
* 介绍H5的两个浏览器缓存，localStorage和sessionStorage的区别。
保存数据的生命周期不同。 sessionStorage只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，sessionStorage 中的数据就会被清空
* fetch和ajax的区别。
1、fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500。 服务器端返回 状态码 400 500的时候 不会reject Response.ok 属性为 true。 
2、在默认情况下 fetch不会接受或者发送cookies ，要发送 cookies，必须设置 credentials 选项。 credentials: 'include'
* Bom是什么,列举你知道的Bom对象;
* function.prototype.bind/call/apply的用法及区别
* 问什么是浏览器的标准模式和怪异模式
答：目前浏览器的排版引擎有三种模式：怪异模式(Quirks mode)、接近标准模式(Almost standards mode)、以及标准模式(Standards mode)。在怪异模式下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。在标准模式下，行为即(但愿如此)由 HTML 与 CSS 的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现。 那么所谓标准模式，就一定都“标准”吗？答案当然是否定的，因为各个浏览器厂商实现标准的阶段不同，所以各个浏览器的“标准模式”之间也会有很大的不同。 Firefox、Safari、Chrome、Opera (自 7.5 以后)、 IE8 和 IE9 都有一个准标准模式。那么既然标准模式都不那么标准，准标准的模式肯定就更不标准了。
* 问解释一下盒模型宽高值的计算方式，边界塌陷，负值作用，box-sizing概念
答：盒模型 a. ie678怪异模式(不添加 doctype)使用 ie 盒模型，宽度=边框+padding+内容宽度 b. chrome， ie9+, ie678(添加 doctype) 使用标准盒模型，宽度= 内容宽度 box-sizing content-box(默认) 布局所占宽度Width： Width = width + padding-left + padding-right + border-left + border-right 布局所占高度Height: Height = height + padding-top + padding-bottom + border-top + border-bottom border-box 布局所占宽度Width： Width = width(包含padding-left + padding-right + border-left + border-right) 布局所占高度Height: Height = height(包含padding-top + padding-bottom + border-top + border-bottom) 边界塌陷 同一BFC下，相邻快级元素边界取最大值 负值作用 display:inline-block是什么呢？相信大家对这个属性并不陌生，根据名字inline-block我们就可以大概猜出它是结合了inline和block两者的特性于一身，简单的说：设置了inline-block属性的元素既拥有了block元素可以设置width和height的特性，又保持了inline元素不换行的特性。
* window.onload和document.onload是否是同时执行，为什么；
* JS中prototype、_proto_、super分别是什么？
答: 这个我一脸懵逼，只说了prototype是原型，_proto_是隐式原型。
* arguments是数组吗？怎么实现用它调用数组方法？类数组和数组的区别是什么？arguments有length属性吗？ 为什么要遍历类数组取值组成数组，还有更简单的方法吗？
* for…in 和for...of的区别
答：for of 遍历的是值，for in 遍历的是索引。
* 数组中的几个替换/遍历方法
* 如何理解跨域；
* 跨域你是怎么解决的，jsonp有什么缺点
-> 浏览器的同源策略导致了跨域,用于隔离潜在恶意文件的重要安全机制
-> [jsonp ，允许 script加载第三方资源]https://segmentfault.com/a/1190000008445998
-> nginx 反向代理（nginx 服务内部配置 Access-Control-Allow-Origin *）
-> cors 前后端协作设置请求头部，Access-Control-Allow-Origin 等头部信息
-> iframe 嵌套通讯，postmessage
* cors请求和普通的http请求有什么区别
* 问data-xxx 属性的作用是什么？
答：data- 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。 存储的(自定义)数据能够被页面的 JavaScript 中利用，以创建更好的用户体验
* promise、setTimeout、async/await的执行顺序。 
* 同源不同标签之间的通信
* 同源标签之间如何通信；
* hybrid 实现原理  
[Hybrid App技术解析 -- 原理篇](https://juejin.im/post/5b4ff3bee51d4519721b9986)
* hybrid 通信方式
-> JSBridge
Android的WebView中有一个WebChromeClient类，这个类其实就是用来监听一些WebView中的事件的，我们发现其中有三个对应于js中的alert(警告框)，comfirm(确认框)和prompt(提示框)方法,通过重写WebView中WebChromeClient类的onJsPrompt()方法来进行js和java的通信。
(1) 在js脚本中把对应的方法名，参数等写成一个符合协议的uri，并且通过window.prompt方法发送给java层。
(2) 在java层的onJsPrompt方法中接受到对应的message之后，通过JsCallJava类进行具体的解析。
(3) 在JsCallJava类中，我们解析得到对应的方法名，参数等信息，并且在map中查找出对应的类的方法。


### React
* React16 有没有使用过
* react 怎样提高性能;
答：shouldComponentUpdate： react的每次render都是带动整个项目一起render的，渲染性能消耗很大很大。要用shouldComponentUpdate更新生命周期函数优化。 当该函数默认返回true的时候，一旦prop或者state有任何变化，都会引起重新render。 shouldComponentUpdate(object nextProps, object nextState) ： -boolean 当组件决定任何改变是否要更新到DOM时被调用。作为一个 优化 实现比较this.props 和 nextProps 、this.state 和 nextState ，如果React应该跳过更新，返回false。 当props、state发生变化时，React会根据shouldComponentUpdate方法来决定是否渲染整个组件。 
* React 的virtual dom 的了解和jquery的直接操作节点的渲染方式相比的优点;
* React 的生命周期
-> constructor -> componentWillMount -> render -> componentDidMount
-> componentWillRecieveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
-> componentWillUnmount
* componentWillReceiveProps  componentShouldUpdate 区别
* componentShouldUpdate 会做setState操作吗
* React之间组件通信的方式，两个兄弟组件之间的通信方式
* redux基本组成和设计
* mobx和redux有没有了解过
* 介绍堆栈和队列，如何用堆栈实现队列


### VUE
* VUE的原理setter和getter相关知识
* vue项目需要注意什么，可以优化的地方；
* vue的computed实现原理；
* vue-router的原理；


### es6 面试题汇总
[es6 面试题汇总](http://www.bslxx.com/a/mianshiti/tiku/javascript/2018/1211/2174.html)


### 编程题
* 快速排序
```
// 时间复杂度(nlogn), 空间复杂度O(n)
var quickSort = function(arr) {
    if(arr.length<=1) return arr;
    var left = [], right = [], point = Math.floor(arr.length/2);
    var middle = arr.splice(point, 1)[0];
    for(var i = 0; i < arr.length; i++){
        arr[i] < middle ? left.push(arr[i]) : right.push(arr[i]) ;
    }
    return quickSort(left).concat([middle], quickSort(right));
}
```

* 数组去重
```
a.forEach(function(value, index){
  b.indexOf(value) === -1 && b.push(value);
})

a.map(function(value, index){
  b.indexOf(value) === -1 && b.push(value);
})

var c;
c = a.filter(function(value, index, array){
  return index === array.indexOf(value);
})

function unique(arr) {
  var ret = [];
  var tmp = {};
  
  for(var i = 0, len = arr.length; i < len; i++){
    if(!tmp[typeof arr[i] + arr[i]]) {
      tmp[typeof arr[i] + arr[i]] = true;
      ret.push(arr[i]);
    }
  }
  
  return ret;
}
```

* 将多维数组平铺；
```
1、 var myNewArray = [].concat.apply([], myArray);
2、 var myNewArray4 = [].concat(...myArray);
3、 var myNewArray = myArray.reduce(function(prev, cur) {
        return prev.concat(cur);
    });
```

* 手写简易 EventEmiter
```
// 参照 vue 源码实现
var EventEmiter = function (){
  this._events = {};
};
EventEmiter.prototype.on = function (event, cb){
  if (Array.isArray(event)){
    for (let i = 0, l = event.length; i < l; i++){
      this.on(event[i], cb);
    }
  } else {
    (this._events[event] || (this._events[event] = [])).push(cb);
  }
  return this;
};
EventEmiter.prototype.once = function (event, cb){
  function on () {
    this.off(event, cb);
    cb.apply(this, arguments);
  }
  on.fn = cb;
  this.on(event, on);
  return this;
};
EventEmiter.prototype.off = function (event, cb){
  if (!arguments.length){
    this._events = Object.create(null);
    return this;
  }
  if (Array.isArray(event)){
    for (let i = 0, l = event.length; i < l; i++){
      this.off(event[i],cb);
    }
    return this;
  }
  if (!cb){
    this._events[event] = null;
    return this;
  }
  if (cb){
    let cbs = this._events[event];
    let i = cbs.length;
    while(i--){
      if (cb === cbs[i] || cb === cbs[i].fn){
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
};
EventEmiter.prototype.emit = function (event){
  let cbs = this._events[event];
  let args = Array.prototype.slice.call(arguments, 1);
  if (cbs){
    for (let i = 0, l = cbs.length; i < l; i++){
      cbs[i].apply(this,args);
    }
  }
};
```

* 写一个url解析函数，解析出查询参数；
```
function parseUrl(url){
    var result = [];
    var query = url.split("?")[1];
    var queryArr = query.split("&");
    queryArr.forEach(function(item){
        var obj = {};
        var value = item.split("=")[1];
        var key = item.split("=")[0];
        obj[key] = value;
        result.push(obj);
    });
    return result;
}
```

* ['1.45.0','1.5','6','3.3.3.3']要求从小到大排序，注意'1.45'比'1.5'大；
```
// 使用的是选择排序
const versionSort = version => {
  const temp = version.map(v => v.split('.'));
  for (let i = 0; i < temp.length; i++) {
    let minIndex = i;
    for (let j = i; j < temp.length; j++) {
      for (let k = 0; k < temp[j].length; k++) {
        const current = +temp[j][k],
        min = +temp[minIndex][k];
        if (current < min) {
          minIndex = j;
        }
        // 只要不等，就立刻结束最内层遍历！
        if (current !== min) {
          break
        }
      }
    }
    [temp[i], temp[minIndex]] = [temp[minIndex], temp[i]];
  }
  return temp.map(v = > v.join('.'))
};
```

* 随意给定一个无序的、不重复的数组arr，任意抽取n个数，相加和为sum，也可能无解，请写出该函数。 

* 节流函数怎么写；
```
function debounce(fn, interval, immediate) {
    let timer;

    return function() {
        const context = this;
        const args = arguments;
        
        timer && clearTimeout(timer);

        if(immediate) {
            var callNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, interval);
            callNow && fn.apply(context, args);
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, interval);
        }
    }
}
```

* 手写bind函数；
```
Function.prototype.bind = function(ctx) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var F = function() {};

    var fBind = function() {
        var argsBind = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof F ? this : ctx, args.concat(argsBind));
    }

    F.prototype = this.prototype;
    fBind.prototype = new F();

    return fBind;
}
```

* promise封装;
[简单的 Promise](https://juejin.im/post/5a5b2b176fb9a01ca7136976)

* 写一个parseInt函数;
```
function parseInt(s, radix = 10) {
    if (typeof s !== 'string') {
        return NaN;
    }
    if (typeof radix !== 'number' || radix < 2 || radix > 36) {
        return NaN;
    }
    let result = 0;
    for (let i = 0; i < s.length; i += 1) {
        let c = s.charCodeAt(i);
        // 小写大写字母转换为数字
        if (c >= 97) {
            c -= 87;    // - 'a' + 10
        } else if (c >= 65) {
            c -= 55;    // - 'A' + 10
        } else {
            c -= 48;    // - '0'
        }
        // 如果字母转化后的值大于进制数，则跳出循环返回之前的结果
        if (c >= radix) {
            if (i === 0) {
                return NaN;
            }
            break;
        }
        // 结果累加，和进制相关
        result = (result * radix) + c;
    }

    return result;
}
```

* 正则表达式实现1000000中间加','；
```
function comma(num) {
    var source = String(num).split(".");
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,"); 
    return source.join(".");
}
```

* 请使用数组的reduce方法实现数组的map方法；

* 大数相加
```
function sumStrings(a,b) {  
    while(a.length < b.length){  
        a = "0" + a;  
    }  
    while(b.length < a.length){  
        b = "0" + b;  
    }  
    var addOne = 0;  
    var result = [];  
    for(var i=a.length-1;i>=0;i--){  
        var c1 = a.charAt(i) - 0;  
        var c2 = b.charAt(i) - 0;  
        var sum = c1 + c2 + addOne;  
        if(sum > 9){  
            result.unshift(sum - 10);  
            addOne = 1;  
        }  
        else{  
            result.unshift(sum);  
            addOne = 0;  
        }  
    }  
    if(addOne){  
        result.unshift(addOne);  
    }  
    if(!result[0]){  
        result.splice(0,1);  
    }  
    return result.join("");  
}  
```

* 请用至少两种方法判断一个对象是否是数组，如何将非数组转化为数组
```
a instanceof Array;
a.constructor === Array;
a.__proto__ === Array.prototype;
Array.prototype.isPrototypeOf(a);  // isProtoTypeOf()
Object.getPrototypeOf(a) === Array.prototype;  // Object.getPrototypeOf()
Object.prototype.toString.call(a) === '[object Array]'; // 首推 -> 前几种继承会扰乱， iframe 下 instance 失效
Array.isArray() // polyfill 就是调用字符串判断法
var argsArray = Array.prototype.slice.call(arguments);
```

### 安全
* xss和csrf攻击;
-> xss 跨站脚本攻击，主要是前端层面的，用户在输入层面插入攻击脚本，改变页面的显示，或则窃取网站 cookie，预防方法：不相信用户的所有操作，对用户输入进行一个转义，不允许 js 对 cookie 的读写
-> csrf 跨站请求伪造，以你的名义，发送恶意请求，通过 cookie 加参数等形式过滤
我们没法彻底杜绝攻击，只能提高攻击门槛
* cookie的有哪些安全的设置；