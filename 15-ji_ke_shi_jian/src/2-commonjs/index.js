let { a, b } = require('./a');
console.log(a);  // 1
console.log(b);  // { num: 1 }
// a = 2
// // b = { num: 2 }
// b.num = 3
setTimeout(() => {
  console.log('ss', a);  // 1
  console.log('ss', b);  // { num: 1 }
}, 500);
