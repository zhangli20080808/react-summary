import React from 'react';

import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from 'redux';
/**
 * HOC
 * @param {*} mapStateToProps 把仓库的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps 把 dispatch 映射为组件的属性对象
 */
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.PureComponent {
      static contextType = ReactReduxContext;
      constructor(props, context) {
        super(props);
        this.state = mapStateToProps(context.store.getState());
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        let boundActions = bindActionCreators(
          mapDispatchToProps,
          this.context.store.dispatch
        );
        return (
          <OldComponent {...this.props} {...this.state} {...boundActions} />
        );
      }
    };
  };
}

/**
const App = connect(mapStateToProps, mapDispatchToProps)(Counter);
*/
