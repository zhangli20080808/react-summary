import { useState, useRef } from "react";
import FormStore from "./FormStore";

export default function useForm() {
  let formRef = useRef();
  const [, forceUpdate] = useState({});
  if (!formRef.current) {
    let forceReRender = () => {
      forceUpdate(); // 调用让组件重新刷新
    };
    let formStore = new FormStore(forceReRender);
    let formInstance = formStore.getForm();
    formRef.current = formInstance;
  }
  return [formRef.current];
}
