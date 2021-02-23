Array.prototype.myreduce = function(fn, value) {
  if(typeof fn !== 'function') return

  let accur = value || this[0]
  let startIndex = value ? 0 : 1

  for(let i = startIndex; i < this.length; i++) {
    accur = fn(accur, this[i], i, this)
  }

  return accur
}
