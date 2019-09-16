var express = require('express'); //引入express模块
var exec = require('child_process').exec; //调用系统命令
var execSync = require('child_process').execSync
var cmdStr = 'console.log("gulp");console.log("11225")'
var isTest = true; //是否上传测试地址

var app = express();  //express对象
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.all('/test', function(req, res, next) {
    res.send('test');
});
//coding的webhook接口，由于gulp等操作时间长。故异步执行构建，先返回请求
app.all('/coding', function(req, res, next) {
    setTimeout(function(){
      //2018年5月31日 17:09:11 暂时取消coding上传后的自动构建，为知道构建、上传是否完成，用页面按钮来操作
      // gulpCmd({res:res,fromCoding:true})
    },0)
    res.send('coding先返回');
});

const verStr = {msg: '压缩上传成功', code: 200};  //版本检查返回的数据，假数据，自行修改

//构建与部署测试地址
app.all('/gulpAndDeployTest', function(req, res, next) {
    isTest = true
    
    gulpCmd({
		res: res,
		project:req.param('project')
	})
});
//构建与部署生产地址
app.all('/gulpAndDeploy', function(req, res, next) {
    isTest = false
    gulpCmd({res:res,project:req.param('project')})
});


//第二个参数表示是否来自coding的请求，是的话由于已经提前send就不再send
function gulpCmd({res,fromCoding,project='loan'}){
  const loanCwd = '/uq/node/gulp/coding/loan';
  const diyCwd = '/uq/node/gulp/coding/wechatdiymall/tq/web';
  let projectCwd = loanCwd;
  if(project == 'diy'){
  	projectCwd = diyCwd
  }
  
  console.log('开始git 强制更新代码')
  execSync('git fetch --all',{cwd:projectCwd})
  execSync('git reset --hard origin/master',{cwd:projectCwd})
  
  
  //定制项目先只更新文件不做构建
  if(project == 'diy'){
  	console.log('diy暂时不gulp')
//	execSync('gulp --option gulp-option-diy',{cwd:'/uq/node/gulp'})
  }else{
  	console.log('开始gulp~~')
  	execSync('gulp',{cwd:'/uq/node/gulp'})
  }
  

  
  if(isTest){
    console.log('开始上传代码到测试地址')
    if(project == 'diy'){
  	execSync('gulp deployTestFile --option gulp-option-diy',{cwd:'/uq/node/gulp'})
  }else{
  	execSync('gulp deployTestFile',{cwd:'/uq/node/gulp'})
  }
//  execSync('gulp deployTestFile',{cwd:'/uq/node/gulp'})
  }else{
    console.log('开始上传代码到生产地址')
    if(project == 'diy'){
  	execSync('gulp deployFile --option gulp-option-diy',{cwd:'/uq/node/gulp'})
  }else{
  	execSync('gulp deployFile',{cwd:'/uq/node/gulp'})
  }
//  execSync('gulp deployFile',{cwd:'/uq/node/gulp'})
  }

  console.log('上传完成')
  if(fromCoding){return false}
  res.send(JSON.stringify(verStr));

}
app.all('/deployFile', function(req, res){ 
  console.log('开始上传代码')
  console.log(execSync('gulp deployFile',{cwd:'/uq/node/gulp'}))
  console.log('上传完成')
  res.send(JSON.stringify({msg: '上传生产地址成功', code: 200}));
});







app.get('/download', function(req, res){  //新版本文件下载接口
  res.download('./new-release.apk');
});
app.listen(3000, function(){  //服务端口监听
  console.log('server now listening at port 3000');
});

