class Bus {
  constructor() {
    this._events = {}
  }

  on(type, cb) {
    if(Array.isArray(type)) {
      type.map((item) => {
        this.on(item, cb)
      })
    } else {
      (this._events[type] || (this._events[type] = [])).push(cb)
      return this
    }
  }

  emit(type) {
    const cbs = this._events[type]
    const args = Array.prototype.slice.call(arguments, 1)
    for(let i=0, l=cbs.length; i<l;i++) {
      cbs[i].apply(this, args)
    }
    return this
  }

  off(type, cb) {
    if(!arguments.length) {
      this._events = Object.create(null)
      return this
    }
    if(Array.isArray(type)) {
      type.map((item) => {
        this.off(item, cb)
        return this
      })
    }
    if(!cb) {
      this._events[type] = null
      return this 
    }
    if(cb) {
      let cbs = this._events[type]
      for(let l=cbs.length, i=l-1; i<l; i--) {
        if(cb === cbs[i]) {
          cbs.splice(i, 1)
        }
      }
    }
  }
}
