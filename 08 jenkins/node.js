/*
 * @LastEditors: 黄典
 */
const fs = require('fs');
const testFolder = './';

// let files = fs.readFileSync(testFolder);
// console.log(files)
// files.forEach(file => {
//   console.log(file);
// });


fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    if (/^index/.test(file)) {
      console.log(file);
    }

  });
})