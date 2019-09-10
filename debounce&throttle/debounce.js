/**
 * 第一版
 * 问题1: this 丢失 -> window
 * 问题2: e 丢失 -> undefined
 */
function debounce1(func, wait) {
    var timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
    }
}

function debounce(fn, wait, immediate) {
    let timer;

    return function() {
        const context = this;
        const args = arguments;
        
        timer && clearTimeout(timer);

        if(immediate) {
            var callNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, wait);
            callNow && fn.apply(context, args);
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, wait);
        }
    }
}

container.onmousemove = debounce(getUserAction, 1000, false);