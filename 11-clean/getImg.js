var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
// var filePath = process.argv[2];
var filePath = path.resolve('./img/static/');


function getImg() {
  let imgBox = []

  function fileDisplaySync(filePath) {
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
        imgBox.push(filedir.split('\static')[1].toString())
      }
    });
  }
  fileDisplaySync(filePath);
  // console.log('imgBox', imgBox)
  // fs.appendFileSync('./log2.txt', JSON.stringify(imgBox).replace(/\\\\/g, "/") + '\n')
  fs.writeFile('img.js', 'module.exports =' + JSON.stringify(imgBox).replace(/\\\\/g, "/"), function (error) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('读取static文件夹文件成功');
  })
}

getImg()


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              // console.log(filedir)
              imgBox.push(filedir.split('\\static')[1].toString())
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}