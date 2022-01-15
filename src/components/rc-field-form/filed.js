import React from "react";
import FieldContent from "./FiledContent";

/**
 * 字段的組件
 1. 獲取上下文信息
 2. 實現雙向的額數據綁定，將value和store同步
 input的值顯示的是 formInstance.store 上的值
 当input的值发生改变的时候，把值放到 formInstance.store  
 <Field name="username">
 */
class Field extends React.Component {
  static contextType = FieldContent;
  getControlled = (childProps) => {
    const { getFieldValue, setFieldValue } = this.context; // formInstance
    const { name } = this.props;
    return {
      ...childProps,
      value: getFieldValue(name),
      onChange: (event) => {
        setFieldValue(name, event.target.value);
      },
    };
  };
  render() {
    let children = this.props.children; // 获取原来的儿子  <Input placeholder="Password" />
    return React.cloneElement(children, this.getControlled(children.props));
  }
}
// function cloneElement(oldElement, newProps) {
//   return { ...oldElement, props: newProps };
// }
export default Field;
