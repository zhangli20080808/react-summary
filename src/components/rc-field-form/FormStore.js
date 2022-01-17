import Schema from './async-validator';
/**
 * 表单仓库，实现表单数据的托管
 */
class FormStore {
  constructor(forceRootReRender) {
    // 存放表单值的对象
    this.store = {};
    this.forceRootReRender = forceRootReRender;
    this.callbacks = Object.create(null);
    this.filedEntities = []; // 保存field组件实例 - 字段实体数组
  }

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
    this.notify()
  };
  setFieldValue = (name, value) => {
    this.store[name] = value;
    this.notify()
  };
  // notify comp update
  notify = () => {
    this.filedEntities.forEach((entity) => entity.storeChange());
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
  setInitialValues = (initialValue, mounted) => {
    if (!mounted) this.store = { ...initialValue };
  };
  registerField = (entity) => {
    this.filedEntities.push(entity);
  };
  /**
   * 调用 onFinish 将 value传入
   */
  submit = () => {
    // 先校验
    this.validateFields()
      .then((values) => {
        let { onFinish } = this.callbacks;
        if (onFinish) {
          onFinish(this.store);
        }
      })
      .catch((errorInfo) => {
        let { onFinishFail } = this.callbacks;
        if (onFinishFail) {
          onFinishFail(errorInfo);
        }
      });
  };
  // 校验表单的值 和 规则是否匹配
  validateFields = () => {
    let values = this.getFieldsValue(); // this.store
    // 传入 rules={[{ min: 3 }, { required: true }]}
    // name: {
    //   type: 'string',
    //   required: true,
    //   validator: (rule, value) => value === 'muji',
    // },
    let descriptor = this.filedEntities.reduce((descriptor, entity) => {
      let rules = entity.props.rules;
      if (rules && rules.length) {
        let config = rules.reduce((memo, rule) => {
          memo = { ...memo, ...rule };
          return memo;
        }, {});
        descriptor[entity.props.name] = config;
      }
      return descriptor;
    }, {});
    return new Schema(descriptor).validate(values);
  };
  getForm() {
    return {
      setFieldValue: this.setFieldValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setCallbacks: this.setCallbacks,
      setInitialValues: this.setInitialValues,
      registerField: this.registerField,
      submit: this.submit,
    };
  }
}

export default FormStore;
