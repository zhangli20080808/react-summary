// const descriptor = {
//   name: {
//     type: 'string',
//     required: true,
//     validator: (rule, value) => value === 'muji',
//   },
//   age: {
//     type: 'number',
//     asyncValidator: (rule, value) => {
//       return new Promise((resolve, reject) => {
//         if (value < 18) {
//           reject('too young');  // reject with error message
//         } else {
//           resolve();
//         }
//       });
//     },
//   },
// };
class Schema {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  /**
   * 失败 {errorField:[],values}
   * @param {*} values
   * @returns
   */
  validate(values) {
    return new Promise(async (resolve, reject) => {
      let errorField = [];
      console.log(this.descriptor);
      for (let name in this.descriptor) {
        let rules = this.descriptor[name]; // {required: true}
        let value = values[name];
        let ruleKeys = Object.keys(rules); // [required,min ,max]
        let errors = [];
        for (let i = 0; i < ruleKeys.length; i++) {
          let ruleKey = ruleKeys[i];
          if (ruleKey === 'required') {
            if (rules[ruleKey] && !value) {
              errors.push(`${name} is required`);
            }
          } else if (ruleKey === 'min') {
            if (value < rules[ruleKey]) {
              errors.push(`${name} 最少是 ${rules[ruleKey]}个字符`);
            }
          } else if (ruleKey === 'max') {
            if (value > rules[ruleKey]) {
              errors.push(`${name} 最多是 ${rules[ruleKey]}个字符`);
            }
          } else if (ruleKey === 'validate') {
            let validate = rules[ruleKey];
            let result = await validate(rules, value);
            if (result.length > 0) {
              errors.push(`${name} 不合符自定义校验器的规则判断`);
            }
          }
        }
        if (errors.length > 0) {
          errorField.push({
            name,
            errors,
          });
        }
      }
      console.log(errorField, 'errorField');
      if (errorField.length > 0) {
        reject({ errorField, values });
      } else {
        resolve(values);
      }
    });
  }
}
export default Schema;
// validator.validate({ name: 'muji' }, (errors, fields) => {
//   if (errors) {
//     // validation failed, errors is an array of all errors
//     // fields is an object keyed by field name with an array of
//     // errors per field
//     return handleErrors(errors, fields);
//   }
//   // validation passed
// });
