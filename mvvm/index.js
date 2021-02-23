class Vue {
  constructor(options = {}) {
    this.initState(options)
  }

  initState(options) {
    this.$options = options
    this._data = this.$options.data

    // 劫持数据
    observe(this._data)
    // 代理data到vue上
    proxyKeys.call(this, this._data)
    // 初始化computed
    initComputed.call(this)
    // 初始化编译器
    new Compile(options.el, this)
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return;
  return new Observe(data)
}

class Observe {
  constructor(data) {
    this.walk(data)
  }
  /**
   * 循环遍历数据对象的每个属性
   */
  walk(data) {
    Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
    })
  }
  /**
   * 将对象的属性用 Object.defineProperty 劫持
   */
  defineReactive(data, key, val) {
    let dep = new Dep()
    observe(val) // 递归劫持
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal
        observe(val)
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor () {
    this.subs = []
    this.target = null
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(vm, exp, fn) {
    this.init(vm, exp, fn)
  }
  init(vm, exp, fn){
    this.fn = fn
    this.vm = vm
    this.exp = exp
    /**
     * watcher 添加到订阅者
     * 缓存自己
     * 强制执行监听器里的get函数
     * 释放自己
     */
    Dep.target = this
    let val = vm
    let arr = exp.split('.')
    arr.forEach((k) => {
      val = val[k]
    })
    Dep.target = null
  }
  update() {
    let val = this.vm
    let arr = this.exp.split('.')
    arr.forEach((k) => {
      val = val[k]
    })
    this.fn(val)
  }
}

function Compile(el, vm){
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while(child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }

  replace(fragment)

  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      // 1:元素节点 3: 文本节点
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split('.') // [a, a] [b]
        let val = vm
        arr.forEach(k => {
          val = val[k]
        })
        node.textContent = text.replace(reg, val)
        new Watcher(vm, RegExp.$1, function(newVal) {
          node.textContent = text.replace(reg, newVal)
        })
      }
      if (node.nodeType === 1) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach((attr) => {
          let name = attr.name
          let exp = attr.value
          // 默认v-model
          if(name.includes('v-')) {
            node.value = vm[exp]
          }
          new Watcher(vm, exp, (newVal) => {
            node.value = newVal
          })
          node.addEventListener('input', (e) => {
            let newVal = e.target.value
            vm[exp] = newVal
          })
        })
      }
      if(node.childNodes) {
        replace(node)
      }
    })
  }

  vm.$el.appendChild(fragment)
}

function proxyKeys(data) {
  let vm = this
  Object.keys(data).forEach((key) => {
    Object.defineProperty(vm, key, {
      enumerable: true,
      get() {
        return vm._data[key]
      },
      set(newVal) {
        vm._data[key] = newVal
      }
    })
  })
}

function initComputed() {
  let vm = this
  let computed = this.$options.computed
  Object.keys(computed).forEach((key) => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get
    })
  })
}