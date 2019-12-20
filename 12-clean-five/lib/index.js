var path = require("path");
var fs = require("fs");
const Util = require('./util');
const config = Util.getConfig();
// console.log('config', config)
const {
  imgDir,
  filePath
} = config
const {
  getImg
} = require('./getFive')

let allFiles = ''
let noImg = []
let contentLength = 0

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
        contentLength++
        allFiles += content + '\n'
      }
    });
  }
  fileDisplaySync(filePath);

}

function check(item) {
  let exc = new RegExp(item);
  return exc.test(allFiles)
}

const ex = {
  async start() {
    concatFiles()
    console.log('所有文件个数：', contentLength)
    console.log('所有文件合并后的长度：', allFiles.length)
    const imgArr = await getImg()
    console.log('imgArr[0]', imgArr[0])
    const time_start = Date.now()
    imgArr.forEach(item => {
      if (!check(item)) {
        noImg.push(item)
      }
    })
    const time_end = Date.now()
    console.log('比对耗时:', time_end - time_start + 'ms')
    console.log('找到未使用文件个数：', noImg.length)
    let output = `
${new Date()}
${JSON.stringify(noImg)}
-----------------------------`
    fs.appendFileSync('./clean-five_output.txt', output)
  }
}
module.exports = ex