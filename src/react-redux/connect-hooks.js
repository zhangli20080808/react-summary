import React, { useState, useMemo, useLayoutEffect, useReducer } from 'react';

import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from 'redux';
/**
 * HOC
 * @param {*} mapStateToProps 把仓库的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps 把 dispatch 映射为组件的属性对象
 */
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      // 组件props
      const { store } = React.useContext(ReactReduxContext);
      const { dispatch, getState, subscribe } = store;
      let prevState = getState(); // 获取最新状态
      const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);
      const dispatchProps = useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [props, dispatch]);
      // 订阅
      // js代码执行，并非浏览器的渲染
      // const [state, forceUpdate] = useReducer((x) => x + 1, 0); // 会让组件刷新
      const [, setState] = useState(0);
      useLayoutEffect(() => {
        // return subscribe(() => forceUpdate(state + 1)); // 如果状态发生变更的话，就执行forceUpdate
        return subscribe(() => setState((x) => x + 1)); // 如果状态发生变更的话，就执行forceUpdate
      }, [subscribe]);
      return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}
