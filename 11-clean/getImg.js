var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
// var filePath = process.argv[2];
var filePath = path.resolve('./img/static/');
let imgBox = []
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getImg() {
  const time_start = Date.now()

  function fileDisplaySync(filePath) {
    let readDir = fs.readdirSync(filePath);

    readDir.forEach(async function (filename) {
      //获取当前文件的绝对路径
      var filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      let stat = fs.statSync(filedir);
      // await sleep(1000)
      if (stat.isDirectory() === true) {
        fileDisplaySync(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
      if (stat.isFile() === true) {
        // imgBox.push(filedir.split('\static')[1].toString())
        imgBox.push(filedir)
      }
    });
  }
  fileDisplaySync(filePath);
  const time_end = Date.now()
  console.log('耗时', time_end - time_start, imgBox.length)
  // fs.appendFileSync('./log2.txt', JSON.stringify(imgBox).replace(/\\\\/g, "/") + '\n')
  // fs.writeFile('img.js', 'module.exports =' + JSON.stringify(imgBox).replace(/\\\\/g, "/"), function (error) {
  //   if (error) {
  //     console.log(error);
  //     return false;
  //   }
  //   console.log('读取static文件夹文件成功');
  // })
}

getImg()