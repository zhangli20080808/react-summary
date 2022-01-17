import React from "react";
import FiledContent from "./FiledContent";
import useForm from "./useForm";
/**
 *
 * @param {*} props
 * onFinish 完成时的回调函数
 * initialValue 初始值
 */
const Form = ({ initialValue, onFinish, children }) => {
  let [formInstance] = useForm();
  formInstance.setCallbacks({
    onFinish,
  });
  const mountRef = React.useRef(null);
  formInstance.setInitialValues(initialValue, mountRef.current);
  if (!mountRef.current) mountRef.current = true;
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
