let a = 1;
let b = { num: 1 }
setTimeout(() => {
  a = 2;
  // b = { num: 2 };
  b.num = 3

  // console.log(a);  // 1
  // console.log(b);  // { num: 1 }
}, 200);

module.exports = {
  a,
  b,
};