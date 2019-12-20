npm i clean-five -D   
在package.json的scripts中加入 "clean": "clean"   
填写配置文件或在命令行中输入，需要清理的所有文件和其引入的所有文件  
新建clean-five.config.js
```
module.exports = {
  filePath: 'test', //需要检测的文件目录
  imgDir: 'test/assets/images',//需要清理的引入文件目录
};
```
然后
```
npm run clean
```
最后会生成clean-five_output.txt