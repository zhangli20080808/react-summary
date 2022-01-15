import React from "react";
import FiledContent from "./filedContent";
import useForm from "./useForm";
/**
 *
 * @param {*} props
 * onFinish 完成时的回调函数
 * initialValue 初始值
 */
const Form = ({ initialValue, onFinish, children }) => {
  const [formInstance] = useForm();
  formInstance.setCallbacks({
    onFinish,
  });
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      }}
    >
      <FiledContent.Provider value={formInstance}>
        {children}
      </FiledContent.Provider>
    </form>
  );
};

export default Form;
