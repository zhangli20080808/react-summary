import React from 'react';
// import { Input } from "antd";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from './index.js';
let uniqueName = (rule, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'zhang') {
        resolve('用户名被占用');
      } else {
        resolve('');
      }
    }, 3000);
  });
};
const Index = () => {
  return (
    <>
      <Form
        initialValue={{ username: '12', password: '34' 
        
         }}
        onFinish={(values) => {
          console.log('Finish:', values);
        }}
        onFinishFail={(errorInfo) => {
          console.log(errorInfo, '失败');
        }}
      >
        <Field
          name="username"
          rules={[
            { min: 3 },
            { required: true },
            {
              validate: uniqueName,
            },
          ]}
        >
          <input placeholder="username" />
        </Field>
        <Field name="password" rules={[{ required: true }]}>
          <input placeholder="password" />
        </Field>
        <button>Submit</button>
      </Form>
    </>
  );
};
export default Index;
