// import { observable ,autorun} from 'mobx'
import { observable, autorun } from './index'

// observable 把普通数据变成可观察数据  Object.defineProperty proxy

// let o = observable({ name: 'zl', city: { name: 13 } })
//思路  autorun 先收集依赖 再去执行
// autorun(()=>{
//   // 自动运行 会先执行一次
//   console.log(o.city.name,'changed')  //  这里我们调用get 所以调用的时候我们存储起来
// })
// o.city.name ='zhangLi'


// 装饰器 一般使用方式