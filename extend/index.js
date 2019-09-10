/**
 * 调用 call, apply
 * 缺点： 不能继承原型上属性， 每次实例浪费内存
 */
function A() {
    this.a = 'a';
}
function B() {
    this.b = 'b';
    A.call(this);
}

var b = new B();
console.log(b.a, b.b);


/**
 * 继承实例
 * 缺点: 引用类型的属性被所有实例共享
 */

function A() {
    this.a = 'a';
}
function B() {
    this.b = 'b';
}

B.prototype = new A();
B.prototype.constructor = B; // 构造函数指回来

var b = new B();
console.log(b.a, b.b);


/**
 * 组合继承
 * 最常用的继承模式
 * 缺点: 调用两次父对象构造函数
 */
function A() {
    this.a = 'a';
}
A.prototype.c = 'c';
function B() {
    this.b = 'b';
    A.call(this);
}

B.prototype  = new A();
B.prototype.constructor = B;

var b = new B();
console.log(b.a, b.b, b.c);


/**
 * 继承原型
 * 缺点: 修改会影响到父对象的原型
 */
function A() { }
A.prototype.a = 'a';
function B() {
    this.b = 'b';
}

B.prototype = A.prototype;
B.prototype.constructor = B;

var b = new B();
console.log(b.a, b.b);


/**
 * 空函数
 */
function A() { }
A.prototype.a = 'a';
function B() {
    this.b = 'b';
}

var F = function() {}
F.prototype = A.prototype;
B.prototype = new F();
B.prototype.constructor = B;

var b = new B();
console.log(b.a, b.b);
/* 抽象出 extend 函数 */
function extend(P,C) {
    var F = function() {};

    F.prototype = P.prototype;
    C.prototype = new F();
    C.prototype.constructor = C;

    C.uber = P.prototype;
}