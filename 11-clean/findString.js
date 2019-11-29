var path = require("path");
var fs = require("fs");
const imgArr = require('./img.js')
const time_start = Date.now()
let hasImg = false
let noImg = []
let imgSize = 0
// console.log('imgArr',imgArr)
var filePath = './tdd';
var lookingForString = '';


// recursiveReadFile(filePath);
// lookingForString = "/index/freeToBuy/chance.png"


imgArr.forEach(item => {
  hasImg = false
  lookingForString = item
  recursiveReadFile(filePath)
  if (!hasImg) {
    noImg.push(lookingForString)
  }
})
fs.appendFileSync('./noImg.txt', JSON.stringify(noImg) + '\n')


const time_end = Date.now()
console.log('比对耗时', time_end - time_start)
console.log('找到未使用文件个数：', noImg.length)
console.log('文件大小为：', (imgSize / 1024).toFixed(2) + 'kb')


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
        // console.log('temp', check(temp))
        if (check(temp)) {
          imgSize += getSize(temp)
          // console.log('temp', temp)
          return false
        }
      };
      return true
    })
  }
}

// function recursiveReadFile(fileName) {
//   if (!fs.existsSync(fileName)) return;
//   if (isFile(fileName)) {
//     check(fileName);
//   }
//   if (isDirectory(fileName)) {
//     var files = fs.readdirSync(fileName);
//     files.forEach((val, key) => {
//       var temp = path.join(fileName, val);
//       if (isDirectory(temp)) recursiveReadFile(temp);
//       if (isFile(temp)) {
//         // console.log('temp', check(temp))
//         if (check(temp)) {
//           // console.log('temp', temp)
//         }
//       };

//     })
//   }
// }

// foreach不能中断循环，可用every，记得还要return true
// function eachTest() {
//   let arr = [1, 2, 3]
//   arr.every(item => {
//     console.log(item)
//     if (item === 2) {
//       return false
//     }
//     return true
//   })
// }
// eachTest()
function check(fileName) {
  var data = readFile(fileName);
  var exc = new RegExp(lookingForString);
  if (exc.test(data)) {
    // console.log(fileName)
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