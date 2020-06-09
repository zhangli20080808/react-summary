import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './kkb-redux';
export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps = {}
) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = { store: PropTypes.object };
    constructor(props, context) {
      super(props, context);
      this.state = { props: {} };
    }
    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());
      this.update();
    }
    update() {
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState());
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      );
      this.setState({
        props: { ...this.state.props, ...stateProps, ...dispatchProps },
      });
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>;
    }
  };
};

//Provider 是我们的父组件  接受一个 store  最后将
export class Provider extends React.Component {
  //定义一个上下文
  static childContextTypes = {
    store: PropTypes.object,
  };
  getChildContext() {
    //上下文会把我们的store传进去
    return { store: this.store };
  }
  constructor(props, context) {
    super(props, context);  // this.store 通过上下文 传递下去了 在子组件中就能拿到store了
    this.store = props.store;
  }
  render() {
    //把孩子渲染出来  渲染到肚子里面
    return this.props.children;
  }
}

// 添加一个bindActionCreators能转换actionCreator为派发函数，redux.js
// function bindActionCreator(creator, dispatch) {
//   return (...args) => dispatch(creator(...args));
// }

export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});
}
