### CSS
* 重绘和回流的区别
### 简答题
* 自我介绍,项目介绍，项目中的难点以及解决方案;
* amd 和 cmd 规范理解；
* post content-type类型
* cookie是什么，怎么存储。
* cookie和session的区别；
* 问请描述一下cookie，sessionStorage和localStorage的区别？

### React
* React16 有没有使用过
* react 怎样提高性能;
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
### 编程题
* 将多维数组平铺；
```
1、 var myNewArray = [].concat.apply([], myArray);
2、 var myNewArray4 = [].concat(...myArray);
3、 var myNewArray = myArray.reduce(function(prev, cur) {
        return prev.concat(cur);
    });
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

* ['1.45.0','1.5','6','3.3.3.3']要求从小到大排序，注意'1.45'比'1.5'大
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

* 写一个parseInt函数
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

* 实现1000000中间加','

* 请使用数组的reduce方法实现数组的map方法

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
