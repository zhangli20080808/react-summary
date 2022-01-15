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
  getFieldValue = (name) => {
    return this.store[name];
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
      getFieldsValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setCallbacks: this.callbacks,
    };
  }
}

export default FormStore;
