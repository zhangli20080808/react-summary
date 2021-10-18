let pathToRegexp = require('path-to-regexp');

//  把一个路径编译成正则表达式 end-> true 精确匹配 false 只匹配前缀
// let regexp = pathToRegexp('/home', [], { end: true });
// console.log(regexp);  // /^\/home(?:\/(?=$))?$/i { keys: [] }
// console.log(regexp.test('/home'));
// console.log(regexp.test('/home/'));
// console.log(regexp.test('/home/a'));

// 有些我们的路径需要传参
// /user/:id
// /user/1
// params = {id :1}
let params = [];
let paramsRegexp = pathToRegexp('/user/:id', params, { end: true });
// console.log(paramsRegexp);
let result = '/user/100'.match(paramsRegexp);
console.log(result); // [ '/user/100', '100', index: 0, input: '/user/100', groups: undefined ]
// console.log(params); // [
//   {
//     name: 'id',
//     prefix: '/',
//     delimiter: '/',
//     optional: false,
//     repeat: false,
//     partial: false,
//     asterisk: false,
//     pattern: '[^\\/]+?'
//   }
// ]
let paramsValue = params.reduce((memo, key, index) => {
  memo[key.name] = result[index + 1];
  return memo;
}, {});
console.log(paramsValue,'paramsValue'); // { id: '100' }

// // ? 表示 分组不捕获也不消费
// // 数字后面必须跟一个字符
// console.log('1a'.match(/\d(?=[a-z])/));
// console.log('1@'.match(/\d(?![a-z])/));
// console.log('a1'.match(/(?<=[a-z])\d/));
// console.log('$1'.match(/(?<![a-z])\d/));

// 贪婪和非贪婪
// 1. 非贪婪(匹配的越少越好) 匹配到满足条件的字符就ok了，返回 2. 贪婪(匹配的越多越好) ，匹配到最后
// let regex2 = /\d([a-z]+)/;
// console.log('1ab2bv'.match(regex2)); // ab [ '1ab', 'ab', index: 0, input: '1ab2bv', groups: undefined ]

// let regex3 = /\d([a-z]+?)/; // 加上？非贪婪匹配 遇到一个小写字母 结束了 没有 就是竟可能匹配多的小写字母
// console.log('1ab2bv'.match(regex3)); // 只有a [ '1a', 'a', index: 0, input: '1ab2bv', groups: undefined ]
