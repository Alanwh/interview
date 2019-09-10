
Function.prototype.call = function(ctx) {
    var ctx = ctx || window;
    ctx.fn = this;  

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('ctx.fn(' + args + ')');
    delete ctx.fn;

    return result;
}

var obj = {
    name: 'aa',
    age: 11
};

function intr(a,b) {
    console.log(this.name + this.age);
    console.log(a+b);
}

intr.call(obj,2,3)
intr.apply(obj,[2,3]);

Function.prototype.apply = function(ctx, arr) {
    var ctx = ctx || window;

    ctx.fn = this;
    var result;

    if(!arr) {
        result = ctx.fn();
    } else {
        var args = [];

        for(var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('ctx.fn(' + args + ')');
    }

    delete ctx.fn;
    return result;
}

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