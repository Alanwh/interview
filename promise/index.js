const isFun = params => typeof params === 'function';
const PENDDING = 'PENDDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';

class MyPromise {
    constructor(hande) {
        if(!isFun(hande)) throw new Error('MyPromise must accept a function as a parameter');
        // 初始状态
        this._status = PENDDING;
        this._value = undefined;
        this._fullfilledQueues = [];
        this._rejectedQueues = [];
        // 执行handle
        try{
            hande(this._resolved.bind(this), this._rejected.bind(this));
        } catch(err){
            this._rejected(err);
        }
    }

    _resolved(val) {
        const run = () => {
            console.log('_resolved define run ~~~~~');
            if(this._status !== PENDDING) return;

            const runFulfilled = (value) => {
                let cb;
                while(cb = this._fullfilledQueues.shift()) {
                    console.log('_resolved runing ~~~~~');
                    cb(value);
                }
            }   

            const runRejected = (err) => {
                let cb;
                while(cb = this._rejectedQueues.shift()) {
                    cb(err);
                }
            }

            if(val instanceof MyPromise) {
                val.then((value)=>{
                    this._status = FULFILLED;
                    this._value = value;
                    runFulfilled(value);
                }, (err)=>{
                    this._status = REJECTED;
                    this._value = err;
                    runRejected(err);
                })
            } else {
                this._status = FULFILLED;
                this._value = val;
                runFulfilled(val);
            }
        }
        
        setTimeout(run, 0)
    }

    _rejected(err) {
        const run = () => {
            console.log('_rejected run ~~~~~');
            if(this._status !== PENDDING) return;

            this._status = REJECTED;
            this._value = err;
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(err);
            }
        }

        setTimeout(run, 0)
    }

    then(onFullfilled, onRejected) {
        const {_status, _value} = this;

        return new MyPromise((onFullfilledNext, onRejectedNext)=> {

            const fulfilled = value => {
                try{
                    if(!isFun(onFullfilled)){
                        onFullfilledNext(_value);
                    } else {
                        const res = onFullfilled(value);
                        if(res instanceof MyPromise) {
                            res.then(onFullfilledNext, onRejectedNext)
                        } else {
                            onFullfilledNext(res);
                        }
                    }
                } catch(err) {
                    onRejectedNext(err);
                }
            }

            const rejected = err => {
                try{
                    if(!isFun(onFullfilled)){
                        onRejectedNext(_value);
                    } else {
                        const res = onRejected(err);
                        if(res instanceof MyPromise) {
                            res.then(onFullfilledNext, onRejectedNext)
                        } else {
                            onFullfilledNext(res);
                        }
                    }
                }catch(err){
                    onRejectedNext(err)
                }
            }

            switch(_status) {
                case PENDDING: 
                    console.log('then pending ~~~~~');
                    this._fullfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value)
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
        if(value instanceof MyPromise) {return value};
        return new MyPromise(resolve => resolve(value));
    }

    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }

    static all(list) {
        return new MyPromise((resolve, reject) => {
            let values = [], count = 0;

            for(let [i, p] of list.entries) {
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++
                    if (count === list.length) resolve(values)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    finally (cb) {
        return this.then(
            value  => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    };
}