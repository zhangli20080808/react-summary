import React from "react";
// import ReactDOM from "react-dom";
// import { Input } from "antd";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "./index";

const Index = () => {
  return (
    <>
      <Form
        initialValue={{ username: "", password: "" }}
        onFinish={(values) => {
          console.log("Finish:", values);
        }}
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
