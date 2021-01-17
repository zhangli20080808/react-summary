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

const observable = (target, key, descriptor) => {
  // 需要将这个目标对象  进行代理操作 创建成可观察对象
  if (typeof key === 'string') {
    // 通过装饰器实现的 先把装饰的值进行深度代理
    let v = descriptor.initializer()
    v = creatObservable(v)
    let relation = new Reaction()
    return {
      configuration: true,
      enumerable: true,
      set(val){
        v = val
        relation.run()
      },
      get(){
        relation.collect()
        return v
      }
    }

  }
  return creatObservable(target)
}

export default observable