

(function () {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hhaah')
    }, 500)
  })
  const promise2 = promise.then(resolve => {
    // console.log('resolve', resolve);
    throw new Error('222')
  })
  // console.log('promise', promise);
  setTimeout(() => {
    console.log('promise', promise); // node执行是 undefined，chrome 执行是 fulfilled
    console.log('promise2', promise2);

  }, 800)
})()