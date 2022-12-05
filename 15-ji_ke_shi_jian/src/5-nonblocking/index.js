const glob = require('glob')
console.log('__dirname', __dirname);
// 

// 阻塞调用，需要 18ms，期间 node 不能做其他
// console.time('glob')
// let result = glob.sync(__dirname + '/**/*');
// console.timeEnd('glob')


// console.log(result);

// 非阻塞调用
glob(__dirname + '/**/*', (err, res) => {
  console.log(res);
})
