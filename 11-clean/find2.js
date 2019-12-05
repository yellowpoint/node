var path = require("path");
var fs = require("fs");
var config = require('./config');
const {
  imgDir,
  filePath
} = config
const {
  getImg
} = require('./getImg2')

let allFiles = ''
let noImg = []

function concatFiles() {
  function fileDisplaySync(filePath) {
    if (/\\\\/.test(filePath)) {
      filePath = filePath.replace(/\\\\/g, '/')
    }
    if (/\\/.test(filePath)) {
      filePath = filePath.replace(/\\/g, '/')
    }

    // console.log('filePath', filePath)
    let exc = new RegExp(imgDir);
    if (exc.test(filePath)) return
    if (/unpackage|static/.test(filePath)) return
    let readDir = fs.readdirSync(filePath);

    readDir.forEach(function (filename) {
      //获取当前文件的绝对路径
      var filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      let stat = fs.statSync(filedir);
      if (stat.isDirectory() === true) {
        fileDisplaySync(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
      if (stat.isFile() === true) {
        let content = fs.readFileSync(filedir, 'utf-8')
        allFiles += content + '\n'
      }
    });
  }
  fileDisplaySync(filePath);

}
concatFiles()
console.log('allFiles', allFiles)

function check(item) {
  let exc = new RegExp(item);
  return exc.test(allFiles)
}

(async () => {

  const imgArr = await getImg()
  console.log('imgArr', imgArr[1])
  const time_start = Date.now()
  imgArr.forEach(item => {
    if (!check(item)) {
      noImg.push(item)
    }
  })
  const time_end = Date.now()
  console.log('比对耗时', time_end - time_start)
  console.log('找到未使用文件个数：', noImg.length)
})()