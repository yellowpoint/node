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

const time_start = Date.now()
let hasImg = false
let noImg = []
let imgSize = 0

var lookingForString = '';

(async () => {
  const imgArr = await getImg()
  // console.log('imgArr', imgArr)
  imgArr.forEach(item => {
    hasImg = false
    lookingForString = item
    recursiveReadFile(filePath)
    if (!hasImg) {
      let imgsrc = path.join(path.resolve(imgDir), item)
      imgSize += getSize(imgsrc)
      noImg.push(item)
    }
  })
  fs.appendFileSync('./noImg.txt', JSON.stringify(noImg) + '\n')


  const time_end = Date.now()
  console.log('比对耗时', time_end - time_start)
  console.log('找到未使用文件个数：', noImg.length)
  console.log('文件大小为：', (imgSize / 1024).toFixed(2) + 'kb')
})()

function recursiveReadFile(fileName) {
  if (/unpackage|static/.test(fileName)) return
  if (!fs.existsSync(fileName)) return;
  if (isFile(fileName)) {
    check(fileName);
  }
  if (isDirectory(fileName)) {
    var files = fs.readdirSync(fileName);
    files.every((val, key) => {
      var temp = path.join(fileName, val);
      if (isDirectory(temp)) recursiveReadFile(temp);
      if (isFile(temp)) {
        if (check(temp)) {
          return false
        }
      };
      return true
    })
  }
}

function check(fileName) {
  var data = readFile(fileName);
  var exc = new RegExp(lookingForString);
  if (exc.test(data)) {
    hasImg = true
    return true
  }
  return false

}

function isDirectory(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}

function isFile(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}

function getSize(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).size;
}

function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}