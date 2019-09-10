class EventEmmiter {
    constructor() {
        this._events = {}
    }
    on(type, cb) {
        if(Array.isArray(type)) {
            type.forEach(tp => this.on(tp, cb))
        } else {
            (this._events[type] || (this._events[type] = [])).push(cb);
            return this;
        }
    }
    emit(type) {
        const cbs = this._events[type];
        const args = Array.prototype.slice.call(arguments, 1);
        cbs && cbs.forEach(cb => cb.apply(this, args));
        return this;
    }
    off(type, cb) {
        if(!arguments.length) {
            this._events = new Object(null);
            return this;
        }
        if(Array.isArray(type)) {
            type.forEach(tp => this.off(tp, cb));
            return this;
        }
        if(!cb) {
            this._events[type] === null;
            return this;
        }
        if(cb) {
            const cbs = this._events[type];
            for(let len = cbs.length, i = len -1; i >= 0; i--) {
                if(cbs[i] === cb || cbs[i].fn === cb) {
                    cbs.splice(i, 1);
                }
            }
        }
        return this
    }
    once(type, cb) {
        function on() {
            this.off(type, cb);
            cb.apply(this, arguments);
        }
        on.fn = cb;
        this.on(type, on);
        return this;
    }
}