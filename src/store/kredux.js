//
// export const counterReducer = function (state = 0, action) {
//   const num = action.payload || 1;
//   switch (action.type) {
//     case 'add':
//       return state + num;
//     case 'minus':
//       return state - num;
//     default:
//       return state;
//   }
// };

export function createStore(reducer, enhancer) {
  // 如果存在enhancer 也就是 applyMiddleware  让createStore变强 enhancer(createStore)返回函数
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  function getState() {
    return currentState;
  }

  // 更新状态
  function dispatch(action) {
    //{ type: "add" })
    // 修改
    currentState = reducer(currentState, action);
    // 变更通知
    currentListeners.forEach(v => v());
    return action;
  }

  function subscribe(cb) {
    currentListeners.push(cb);
  }

  // 初始化状态
  dispatch({type: "@IMOOC/KKB-REDUX"});

  return {
    getState,
    dispatch,
    subscribe
  };
}

// 高阶函数 变成 superDispatch 把中间件的所有任务都执行完 才会执行最终的dispatch
/*
const store = createStore(
    combineReducers({counter: counterReducer}),
    applyMiddleware(logger, thunk)
);

function logger() {
  // 返回真正中间件任务执行函数
  return dispatch => action => {
    // 执行中间件任务
    console.log(action.type + "执行了！！！");

    // 执行下一个中间件
    return dispatch(action);
  };
}
* */
export function applyMiddleware(...middlewares) {
  //middlewares logger thunk
  return createStore => (...args) => {
    // 完成之前createStore工作
    const store = createStore(...args);
    // 原先dispatch
    let dispatch = store.dispatch;
    // 传递给中间件函数的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    // 将来中间件函数签名如下： funtion ({}) {}
    //[fn1(dispatch),fn2(dispatch)] => fn(diaptch)
    const chain = middlewares.map(mw => mw(midApi));
    console.log(chain,'chain')
    // 强化dispatch,让他可以按顺序执行中间件函数
    console.log(store.dispatch,'action')
    dispatch = compose(...chain)(store.dispatch);
    // 返回全新store，仅更新强化过的dispatch函数
    return {
      ...store,
      dispatch
    };
  };
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 聚合函数数组为一个函数 [fn1,fn2] => fn2(fn1())
  return funcs.reduce((left, right) => (...args) => right(left(...args)));
}
