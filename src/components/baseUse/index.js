import React from 'react'
// import JSXBaseDemo from './JSXBaseDemo'
// import ConditionDemo from './ConditionDemo'
// import ListDemo from './ListDemo'
// import EventDemo from './EventDemo'
// import FormDemo from './FormDemo'
// import PropsDemo from './PropsDemo';
// import StateDemo from './StateDemo'
// import StateDemo1 from './StateDemo1'
// import StateDemo2 from './msgState'

class BaseUseDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }

  componentDidMount () {
    console.log('我是父组件')
  }

  // 0 0 0 0 1 2 3 3 3
  render () {
    console.log('父组件render')
    return (
      <div>
        {/* <JSXBaseDemo/> */}
        {/* <ConditionDemo/> */}
        {/*<ListDemo/>*/}
        {/* <EventDemo/> */}
        {/* <FormDemo/> */}
        {/* <PropsDemo /> */}
        {/* <StateDemo/> */}
        {/* <StateDemo1/> */}
        {/* <StateDemo2/> */}
      </div>
    )
  }
}

export default BaseUseDemo

// React 组件生命周期图示
// http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
