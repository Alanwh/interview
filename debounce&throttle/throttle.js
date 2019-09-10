function throttle1(func, await) {
    var prev = 0, ctx, args;
    return function() {
        var now = + new Date();
        ctx = this; args = arguments;
        if(now - prev > await){
            func.apply(ctx, args);
            prev = now;
        }
    }
}

function throttle2(func, wait) {
    var timer, ctx, args;
    return function() {
        ctx = this;
        args = arguments;
        if(!timer){
            timer = setTimeout(
                function() {
                    timer = null;
                    func.apply(ctx, args);
                }, wait
            )
        }
    }
}

function throttle(func, wait, opts) {
    var prev = 0, timer, ctx, args;
    if(!opts) opts = {};

    var later = function() {
        prev = opts.leading === false ? 0 : +new Date();
        timer = null;
        func.apply(ctx, args);
    }

    var throttled = function() {
        var now = +new Date();
        if(!prev && opts.leading === false) prev = now;
        var remaining = wait - (now - prev);
        ctx = this, args = arguments;
        if(remaining <= 0 || remaining > wait){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            prev = now;
            func.apply(ctx, args);
        } else if(!timer && opts.trailing !== false) {
            timer = setTimeout(later, remaining);
        }
    }

    return throttled;
}

// container.onmousemove = throttle(getUserAction, 3000);