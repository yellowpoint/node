//基础公共库环境变量管理存放路径
const base = process.env.NODE_BASE == null ? '' : process.env.NODE_BASE;
const params = getParams();
console.log('seting path : ',process.execPath);
console.log('event path:',__dirname);
const home=process.cwd();
console.log('workspace',home);
if (home && home.length>4) {
	var config = require(home + "/pom.js");
	var reources = config.reources;
	var project = config.project;
	var properties  =filterProperties(config);
	replaceReources(reources, properties);
	build(project);
}
function filterProperties(config) {
	var properties = config.properties;
	if(!properties){
		properties={};
	}
	if (params.profile) {
		if (config[params.profile]) {
			var env = config[params.profile].properties;
			if (env) {
				console.log('env',env);
				for ( var key in env) {
					console.log('env key',key);
					console.log('env value',env[key]);
					properties[key] = env[key];
				}
			}
		}
	}
	return properties;
}
function build(project) {
	if ('true' == project.clean) {
		sendShell(" rm -rf  dist ");
		sendShell(" rm -rf  target ");
	}
	var build = "";
	if (project.pack == 'vue') {
		build = build + " npm install --ignore-scripts ";
		build = build + " && npm run build ";
	}else if(project.pack == 'gulp') {
		build = build + " npm install --ignore-scripts ";
		 build = build + " && node-gulp";

	}else if(project.pack == 'uni') {
    build = build + " mkdir -p dist ";
    build = build + " && rsync -av --exclude dist --exclude pom.js --exclude .svn ./unpackage/dist/build/h5/* ./dist ";
  } 
  else {
		build = build + " mkdir -p dist ";
		build = build + " && rsync -av --exclude dist --exclude pom.js --exclude .svn ./* ./dist ";
	}
	sendShell(build);
	var moment = require(base + 'moment');
	var formatDate = moment().format('YYYYMMDDHHmmss'); /* 格式化时间 */
	var outFile = project.name + "_" + formatDate + ".tar.gz";
	var packShell= " cd dist && tar -zcf " + outFile + " * ";
	packShell=packShell+" && mkdir -p ../target ";
	packShell=packShell+" && mv " + outFile + " ../target/ "
	sendShell(packShell);
}
function sendShell(shell) {
	console.log(shell);
//	shell="cd "+ home +" && "+ shell;
	require('shelljs/global');
	if (exec(shell).code !== 0) {
		echo('Error: commit failed');
		exit(1);
	}
}
function replaceReources(reources, properties) {
	reources.forEach(function(item, index) {
		for ( var key in properties) {
			var cmd = 'replace ' + key + ' ' + properties[key] + ' ' + item + ' g ';
			sendShell(cmd);
		}
	});
}
// 使用-h查看帮助
function getParams() {
	var program = require(base + 'commander');
	program.version('0.0.1');
	program.usage('[options] [value ...]');
	program.option('-P, --home_path <path>', '工作空间');
	program.option('-F, --profile <profile>', '构建环境');
	program.parse(process.argv);
	return program;
}
