import React, { Component } from 'react';
import { Input, Button } from 'antd';

// 创建高阶组件
function kFormCreate(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {}; //表单配置项
      this.state = {};
    }
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.validateField(name);
        }
      );
    };
    validateFields = (cb) => {
      console.log(this.state);
      //   console.log(this.state);
      const ret = Object.keys(this.options).every((field) =>
        this.validateField(field)
      );
      // 将校验结果传出去，并传递数据
      cb(ret, this.state);
    };
    validateField = (field) => {
      const { rules } = this.options[field];
      // 校验: ret如果是false校验失败
      const ret = !rules.some((rule) => {
        if (rule.require) {
          if (!this.state[field]) {
            this.setState({
              [field + 'Message']: rule.message,
            });
            return true;
          }
        }
        return false;
      });
      if (ret) {
        this.setState({
          [field + 'Message']: '',
        });
      }
      return ret;
    };
    // 生成返回一个装饰器 去对input 做拓展  接收两个参数返回一个装饰器 传进来一个组件 我们不能修改的
    getFieldDec = (field, option) => {
      this.options[field] = option;
      return (InputComp) => {
        return (
          <div>
            {React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || '',
              onChange: this.handleChange, // 输入值变化监听回调
            })}
            {/* 校验错误信息 */}
            {this.state[field + 'Message'] && (
              <p style={{ color: 'red' }}>{this.state[field + 'Message']}</p>
            )}
          </div>
        );
      };
    };

    render() {
      return (
        <Comp
          {...this.props}
          getFieldDec={this.getFieldDec}
          validateFields={this.validateFields}
        ></Comp>
      );
    }
  };
}

@kFormCreate
class KFormTest extends Component {
  onLogin = () => {
    this.props.validateFields((isValid, data) => {
      if (isValid) {
        console.log('登录！！！！');
      } else {
        alert('校验失败');
      }
    });
  };
  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {/*   一般我们拿值 需要事件监听 我能不能拿到组件？拿到 input 去修改 */}
        {getFieldDec('username', {
          rules: [{ require: true, message: '请输入用户名 ' }],
        })(<Input type="text" />)}
        {getFieldDec('password', {
          rules: [{ require: true, message: '请输入密码 ' }],
        })(<Input type="password" />)}
        <Button onClick={this.onLogin}>log</Button>
      </div>
    );
  }
}

export default KFormTest;

// 尝试实现Form（布局、提交）、FormItem（错误信息）、Input（前缀图标）