var fs = require('fs');
var path = require('path');
var config = require('./config');

//解析需要遍历的文件夹，我这以E盘根目录为例
// var filePath = process.argv[2];
const imgDir = config.imgDir
var filePath = path.resolve(imgDir);
let imgBox = []


const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


function readdir(filePath) {
  // console.log('readdir', filePath)
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.warn(err)
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}


function stat(filedir) {
  return new Promise((resolve, reject) => {
    fs.stat(filedir, (err, stats) => {
      if (err) {
        console.warn(err)
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

async function getStat(filePath, filename) {

  const filedir = path.join(filePath, filename);
  // await sleep(1000)
  const stats = await stat(filedir)
  if (stats.isFile()) {
    // 是文件
    let result = filedir.replace(/\\/g, "/")
    // console.log(result)
    result = result.split(imgDir)[1]
    imgBox.push(result)
  }
  if (stats.isDirectory()) {
    // 是文件夹
    await getFive(filedir)
  }
  return stats
}

async function getFive(filePath) {
  const files = await readdir(filePath)
  const promises = files.map(filename => getStat(filePath, filename))
  const res = await Promise.all(promises)
  // console.log('res222', res.length)
  return res.length
}
const getFiveObj = {
  async getImg() {
    const time_start = Date.now()
    await getFive(filePath)
    const time_end = Date.now()
    console.log('获取未使用文件个数:', imgBox.length)
    console.log('获取未使用文件耗时:', time_end - time_start + 'ms')
    return imgBox
  }
}

module.exports = getFiveObj