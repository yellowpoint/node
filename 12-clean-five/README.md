npm i clean-five -D   
在package.json的scripts中加入 "clean": "clean"   
填写配置文件或在命令行中输入，需要清理的所有文件和其引入的所有文件  
新建clean-five.config.js
```
module.exports = {
  filePath: 'test',
  imgDir: 'test/assets/images',
};
```
最后
```
npm run clean
```