// 返回一个新的函数
// 添加一个bindActionCreator能转换actionCreator为派发函数，redux.js
function bindActionCreator(creator, dispatch) {
  // 页面使用 store.dispatch({type: 'add'})
  // ()=>({type:'add'}) -- creator
  return (...args) => dispatch(creator(...args));
}
// 批量绑定
// let actions = {add,minus}  let boundAction = bindActionCreators(actions,dispatch)
// 使用：boundAction.add
export function bindActionCreators(creators, dispatch) {
  // {add:()=>({type:'add'})}  从上面变下面
  // {add:(...args) => dispatch(creator(...args))} //执行dispatch {type:'add'}

  if (typeof creators === 'function') {
    return bindActionCreator(creators, dispatch);
  }
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});

  // for in 写法
  // let boundActionCreators = {};
  // for (const key in creators) {
  //   const actionCreator = creators[key];
  //   boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  // }
  // return boundActionCreators;
}
