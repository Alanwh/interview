/**
 * 数组详解
 */

 /**
  * 数组创建
  * 1. 构造器方式
  * 2. 字面量方式
  * es6 扩展 Array.of / Array.from -> 可以用于类数组
  */
 var arr = new Array(8) = Array(8); // [undefined * 8]
 var arr = []; arr.length = 8; // [undefined * 8]
 var arr = new Array(5,5); // [5,5]
 
 var arr = Array.of(8); // [8] ---> Array.of 对单个参数的扩展
 Array.from(obj, function(value, index){ console.log(value, index, this, arguments.length); })
 var obj = {0: 'a', 1: 'b', 2: 'c', length: 3}
 Array.from(obj, (value) => value); // 要有 return ,不然都是 undefined
 Array.from({length: 10}, (value, index) => index); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 
 // 判断是否是数组
 var a = [];
 a instanceof Array;
 a.constructor === Array;
 a.__proto__ === Array.prototype;
 Array.prototype.isPrototypeOf(a);  // isProtoTypeOf()
 Object.getPrototypeOf(a) === Array.prototype;  // Object.getPrototypeOf()
 Object.prototype.toString.call(a) === '[object Array]'; // 首推 -> 前几种继承会扰乱， iframe 下 instance 失效
 Array.isArray() // polyfill 就是调用字符串判断法
 
 /**
  * 改变自身的(9个) api
  *  es3: pop  push  shift  unshift  sort  reverse  splice  
  *  es6: fill  copyWithin
  */
 var a = ['a','b','c'];
 
 var b = a.pop(); // a = ['a','b']; b = 'c';
 
 var b = a.push('d'); // a =['a','b','c','d']; b = 4; -> push 返回数组 length
 var b = Array.prototype.push.apply(a,['d','e']); // a =['a','b','c','d','e']; b =5;
 
 var b = a.shift(); // a = ['b','c']; b = 'a';
 
 var b = a.unshift('x'); // a = ['x','a','b','c']; b = 4;
 
 var a = ['b','c',3,'a']; // -> 字符串的Unicode
 var b = a.sort(); // b === a = [3,'a','b','c'];
 var c = [20,3,1,15];
 var d = c.sort(); // c === d = [1,15,20,3];
 var e = c.sort((a,b) => a-b); c = d = [1,3,15,20];
 
 var a = [1,2,3,4];
 var b = a.reverse(); // a === b = [4,3,2,1]
 
 var a = [1,2,3,4,5]; // arr.aplice(start, number, item1, item2, ...)
 var b = a.splice(2,1); // a = [1,2,4,5]; b = [3];
 var c = a.splice(3); // a = [1,2,3]; b = [4,5]; -> 没有个数，删到结尾
 var d = a.splice(-2,1,8,9); // a = [1,2,3,8,9,5]; d = [4];
 var e = a.splice(-7,3,8,9); // a = [8,9,4,5];
 
 var a = [1,2,3,4,5]; // array.fill(value, start, end)
 var b = a.fill(88,1,2); // a === b = [1,88,3,4,5]; -> 结束位置为 end - 1
 
 var a = [1,2,3,4,5]; // array.copyWithin(target/替换开始位置, start/读取替换值位置, end/结束替换值位置)
 var b = a.copyWithin(0,2,4); // a === b = [3,4,3,4,5];
 var b = a.copyWithin(1,2); // a === b = [1,3,4,5,5];
 
 /**
  * 不改变自身的(9个) api
  *  es3: concat  join  slice  toString  toLocalString
  *  es5: indexOf  lastIndexOf
  *  es7: includes  
  *  非标: toSource
  */
 var a = [1,2,3];
 
 var b = a.concat(4,[5,6]); // b = [1,2,3,4,5,6]; 
 
 var b = a.join(); // b = '1,2,3'; -> 默认逗号连接
 var c = a.join(''); // c = '123';
 
 var a = [{color: 'red'},2,3,4,5];
 var b = a.slice(0,1); // b = [{color: 'red'}]; a[0] === b[0]; -> 浅复制
 var c = a.slice(-2); // c = [4,5];
 
 var b = a.toString(); // b = '1,2,3'; -> 默认逗号连接
 var c = a + ',4'; // c = '1,2,3,4'; -> 数组加字符串隐式调用 toString()
 
 var a= [{name:'zz'}, 123, "abc", new Date()]; // -> 调用各自类型的 toString().join()
 var b = a.toLocaleString(); // [object Object],123,abc,2016/1/5 下午1:06:23
 
 var a = ['abc',123,'d',{name: 'alan'}]; // arr.indexOf(el, from);
 var b = a.indexOf('d'); // 2
 var c = a.indexOf(123,-2); // -1
 
  var a = [1,2,3,2,1];
  var b = a.lastIndexOf(2); // 3
  var c = a.lastIndexOf(1); // 4
 
  var a = [2,3,4,NaN]; // arr.includes(el, from); -> 返回 Boolean
  var b = a.includes(NaN); // true; -> includes 和 indexOf 的区别是识别 NaN
  var c = a.indexOf(NaN); // -1; ->
 
  var a = ['abc',123,'d',{name: 'alan'}];
  var b = a.toSource(); // b = ['abc',123,'d',{name: 'alan'}]; 返回本身
 
 /**
  * 遍历数组(12个) api
  *   es5: forEach  every  some  filter  map  reduce  reduceRight            
  *   es6: entries  find&findIndex  values  keys  Symbol.iterator
  */
 
 var a = [1,2,3]; // array.forEach(fn(value, index, array){}, obj)
 var obj = { name: 'alan'};
 var b = a.forEach(function(value, index, array){
   array[index] = value * value;
   console.log(this.name); // 'alan' * 3
 }, obj);
 // b = undefined; -> 无返回值; a = [1,4,9]; 
 
 var a = [8,5,9,4,12,6];
 var b = [6,8,6,12,21,34];
 var fn = function(value, index, array){ return value > 5};
 a.every(fn); // false; -> 返回 Boolean -> 有一个返回 false , 则返回 false
 b.every(fn); // true;
 
 a.some(fn); // true; -> 返回 Boolean -> 有一个返回 true , 则返回 true
 b.some(fn); // true;
 
 var a = [8,5,9,4,12,6];
 var fn = function(value, index, array){ return value > 8};
 var b = a.filter(fn); // b = [9,12]; -> 起过滤效果
 
 var a = [8,5,9,4,12,6];
 var obj = { name: 'alan'};
 var b = a.map(function(value, index, array){
   console.log(value, index, array);
   console.log(this.name); // 'alan' * 3
   return value * index; // a = [8,5,9,4,12,6]; b = [0,5,18,12,14,60,36];
 }, obj);
 
 var a = [1,2,3,4,5];
 var fn = function(prev, value, index, array){
   return prev + value * 2; // 12 16 22 30 40
 }
 var b = a.reduce(fn, 10); // 40
 
 var c = a.reduceRight(fn, 10); // 20 28 34 38 40
 
 var a = ["a", "b", "c"];
 var b = a.entries();
 console.log(b.next().value); // [0, "a"]
 console.log(b.next().value); // [1, "b"]
 console.log(b.next().value); // [2, "c"]
 console.log(b.next().value); // undefined
 
 var a = [2,4,5,6,7,8,9];
 var f = function(value, index, array) {
   return value % 2 === 1;
 }
 var f1 = function(value, index, array) {
   return value > 10;
 }
 var b = a.find(f); // 5
 var c = a.find(f1); // undefined
 var d = a.dindIndex(f); // 2
 var e = a.dindIndex(f1); // -1
 
 var a = ['abc','xyz'];
 var b = a.values();
 var c = b.next().value; // 'abc'
 var d = b.next().value; // 'xyz'
 
 var array = ["abc", "xyz"];
 var iterator = array.keys();
 console.log(iterator.next()); // Object {value: 0, done: false}
 console.log(iterator.next()); // Object {value: 1, done: false}
 console.log(iterator.next()); // Object {value: undefined, done: false}
 
 var array = ["abc", "xyz"];
 var iterator = array[Symbol.iterator]();
 console.log(iterator.next().value); // abc
 console.log(iterator.next().value); // xyz
 
 /**
  * 数组去重
  */
 var a = [3,[],{},undefined,undefined,null,null,NaN,NaN,3,'3'];
 var b = [];
 
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
   var ret = []; var tmp = {};
   for(var i = 0, len = arr.length; i < len; i++){
     if(!tmp[typeof arr[i] + arr[i]]) { // 区分1 & '1'
       tmp[typeof arr[i] + arr[i]] = true;
       ret.push(arr[i]);
     }
   }
   
   return ret;
 }
 
 function unique(arr) {
   var temp = {};
   
   return arr.filter(function(item, value){
     return temp.hasOwnProperty(typeof item + item) ? false : temp[typeof item + item] = true;
   })
 }
 