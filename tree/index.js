var a = [
    {id:2,parent:1,value:'css'},
    {id:1,parent:null,value:'html'},
    {id:3,parent:2,value:'javascript'}
];

var b = {
    id:1,
    parent:null,
    value:'html',
    child: {
        id:2,
        parent:1,
        value:'css',
        child: {
            id:3,
            parent:2,
            value:'javascript'
        }
    }
};

// 实现函数switch, 满足 b = switch(a);
/**
 * 此方法格式化  需要保证是 父子有 一对一关系
 * @param {*} arr 
 */
function mySwitch(arr) {
    if (!Array.isArray(arr)) {
        return arr;
    }
    arr.sort((elem1, elem2) => {
        return +elem2.parent - (+elem1.parent);
    });

    let obj = {};
    arr.forEach((elem, index) => {
        if (index === 0) {
            obj = elem;
        } else {
            elem.child = obj;
            obj = elem;
        }
    });

    return obj;
}