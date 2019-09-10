/**
 * 浅拷贝
 */
function extend(P, C) {
    var pProp = P.prototype;
    var cProp = C.prototype;

    for(var i in pProp) {
        cProp[i] = pProp[i];
    }

    C.uber = P.prototype;
}


/**
 * 深拷贝
 */
function extend(p, c){
    var c = c || {};

    for(var i in p){
        if(typeof p[i] === 'object') {
            c[i] = (p[i] instanceof 'Array') ? [] : {};
            extend(p[i], c[i]);
        }else{
            c[i] = p[i]
        }
    }
}