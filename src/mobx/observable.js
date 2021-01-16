import Reaction from './reaction'

function deepProxy (val, handler) {
  if (typeof val !== 'object') return val
  for (let key in val) { //从后往前依次代理
    val[key] = deepProxy(val[key], handler)
  }
  return new Proxy(val, handler())
}

function creatObservable (val) {
  // 声明一个专门用来代理的对象
  let handler = () => {
    let relation = new Reaction()

    return {
      set (target, key, value) {
        if (key === 'length') return true
        let r = Reflect.set(target, key, value)
        relation.run()
        return r
      },
      get (target, key) {
        relation.collect()
        // if (typeof target[key] === 'object') {
        //   return new Proxy(target[key], handler);
        // }
        return Reflect.get(target, key)
      }
    }
  }

  return deepProxy(val, handler)
}

const observable = (target) => {
  return creatObservable(target)
}

export default observable