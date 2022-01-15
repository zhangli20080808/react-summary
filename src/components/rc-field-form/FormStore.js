/**
 * 表单仓库，实现表单数据的托管
 */
class FormStore {
  constructor(forceRootReRender) {
    // 存放表单值的对象
    this.store = {};
    this.forceRootReRender = forceRootReRender;
    this.callbacks = Object.create(null);
  }

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
  };
  setFieldValue = (name, value) => {
    this.store[name] = value;
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  getFieldsValue = () => {
    return this.store;
  };
  setCallbacks = (callbacks) => {
    this.callbacks = callbacks;
  };
  /**
   * 调用 onFinish 将 value传入
   */
  submit = () => {
    let { onFinish } = this.callbacks;
    if (onFinish) {
      onFinish(this.store);
    }
  };
  getForm() {
    return {
      setFieldValue: this.setFieldValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  }
}

export default FormStore;
