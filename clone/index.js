/**
 * 浅克隆
 * 问题: 引用类型会相互影响
 */
var a = [3,'3',6,true,undefined,null];
var b = a.concat(); // b === a -> false
var c = a.concat(); // c === a -> false

/**
 * 深克隆
 * 问题: 对函数无效
 */
var a = [[2,5], 1,'2', {}, {a: 11}];
var b = JSON.parse(JSON.stringify(a)); // a === b -> false

/**
 * 浅克隆
 */
function shadowClone(obj) {
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;

    var newObj = obj instanceof Array ? [] : {};
    newObj.constructor = obj.constructor;

    for(var i in obj){
        if(obj.hasOwnPropety(i)){
            newObj[i] = obj[i];
        }
    }

    return newObj;
}

/**
 * 深克隆
 */
function deepClone(obj) {
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;

    var newObj = obj instanceof Array ? [] : {};
    newObj.constructor = obj.constructor;

    for(var i in obj) {
        if(obj.hasOwnPropety(i)){
            newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
        }
    }

    return newObj;
}