class Promise {
  constructor(excutor) {
    this._status = 'PENDDING'
    this._value = undefined
    this._fulfilledQuens = []
    this._rejectedQuens = []

    try{
      excutor(this._resolve.bind(this), this._reject.bind(this))
    }catch(err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    const run = () => {
      const runResolve = (value) => {
        let cb;
        while(cb = this._fulfilledQuens.shift()) {
          cb(value)
        }
      }
      const runRejected = (error) => {
        let cb;
        while(cb = this._rejectedQuens.shift()) {
          cb(error)
        }
      }

      if(val instanceof Promise) {
        val.then(
          value => {
            this._status = 'FULFILLED'
            this._value = value
            runResolve(value)
          }, 
          error => {
            this._status = 'REJECTED'
            this._value = error
            runRejected(error)
        })
      } else {
        runResolve(val)
      }
    }

    setTimeout(run, 0);
  }

  _reject(error) {
    if (this._status !== 'PENDDING') return

    const run = () => {
      let cb;
      this._status = 'REJECTED'
      this._value = error
      while(cb = this._rejectedQuens.shift()) {
        cb(error)
      }
    }

    setTimeout(run, 0);
  }

  then(onFulfilled, onRejected) {
    const {_value, _status} = this
    return new Promise((onFulfilledNext, onRejectedNext) => {
      const fulfilled = (value) => {
        try{
          if (typeof onFulfilled !== 'function') {
            onFulfilledNext(value)
          } else {
            const res = onFulfilled(value)
            if(res instanceof Promise) {
              res.then(onFulfilledNext, onRejectedNext)
            }else{
              onFulfilledNext(res)
            }
          }
        }catch(err){
          onRejectedNext(err)
        }
      }
      const rejected = (error) => {
        try{
          if (typeof onRejected !== 'function') {
            onRejectedNext(error)
          } else {
            const res = onRejectedNext(error)
            if(res instanceof Promise) {
              res.then(onFulfilledNext, onRejectedNext)
            }else{
              onRejectedNext(res)
            }
          }
        }catch(err){
          onRejectedNext(err)
        }
      }
      switch(_status) {
        case 'PENDDING': 
          this._fulfilledQuens.push(fulfilled);
          this._rejectedQuens.push(rejected);
          break;
        case 'FULFILLED': 
          fulfilled(_value)
          break;
        case 'REJECTED': 
          rejected(_value)
          break;
      }
    })
  }

  static resolve(value) {
    if(value instanceof Promise) return value
    return new Promise(resolve => resolve(value))
  }

  static rejected(value) {
    return new Promise((resolve, reject) => reject(value))
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  all(list) {
    return new Promise((resolve, reject) => {
      let values = []
      let idx = 0
      list.forEach((item, index) => {
        this.resolve(item).then(
          res => {
            values[index] = res
            idx++
            idx === list.length && resolve(values)
          }, 
          error => {
            reject(error)
        })
      })
    })
  }
}