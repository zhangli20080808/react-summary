import React from "react";
// import { Input } from "antd";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "./index";

const Index = () => {
  return (
    <>
      <Form
        initialValue={{ username: "12", password: "34" }}
        onFinish={(values) => {
          console.log("Finish:", values);
        }}
        onFinishFail={
          (errorInfo)=> {
            console.log(errorInfo,'失败')
          }
        }
      >
        <Field name="username">
          <input placeholder="username" />
        </Field>
        <Field name="password">
          <input placeholder="password" />
        </Field>
        <button>Submit</button>
      </Form>
    </>
  );
};
export default Index;
