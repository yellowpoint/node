const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')
const compressing = require('compressing')
//读取文件夹
let readDir = fs.readdirSync('./mycom') //此处用同步减少嵌套，然该代码结构简洁
//开启一个node服务
http.createServer(function(request, response) {
	let _word = ''
	//循环拼接html
	for(let i = 0; i < readDir.length; i++) {
		let name = readDir[i].split('.')[0];
		_word += `<div><li><input type='checkbox' id='${name}' name='${name}'>${name}</li></div>`;
	}

	//读取请求路径
	let pathname = url.parse(request.url).pathname;
	switch(pathname) {
		case '/':
			fs.readFile('./template.html', function(err, data) {
				let _data = data.toString().replace('{{list}}', _word) //这里就是最简单的模板引擎了
				response.end(_data)
			})

			break;
		case '/download':

			var post = ''
			var dirname = './download'
			//+ new Date().getTime()
			//			+md5(new Date.toString())  需要加上时间的md5戳，保证这个文件的唯一性，防止有多个人同时下载的时候，在服务端创建的文件夹被顶掉
			var length = 0;
			var nowdd = 0;
			//获取post数据
			request.on('data', function(chunk) {
				post += chunk;
			})
			request.on('end', function(chunk) {
				//获取完之后序列化数据
				post = querystring.parse(post);
				//创建文件夹
				fs.mkdir(dirname, function() {
					for(let item in post) {
						length++;
						(function(name) {
							fs.readFile(`./mycom/${name}.vue`, function(err, data) {
								fs.writeFile(dirname + '/' + name + '.vue', data, function() {
									nowdd++;
									//全部写入则压缩
									if(nowdd == length) {
										let zipname = 'dowload.zip'
										compressing.zip.compressDir(dirname, './' + zipname)
											.then(() => {
												//压缩完成后返回给使用者
												fs.readFile('./' + zipname, function(err, data) {
													//需要设置响应头，告诉浏览器为压缩文件
													response.writeHead(200, {
														'Content-type': 'application/x-zip-compressed'
													})
													response.end(data)
												})
											})
									}
								})
							})
						})(item);

					}
				})
			})

			break;
		case '/downbynode':

			var dirname = './download'
			var nowdd = 0;

			let params = url.parse(request.url, true).query;
			let _arr = params.need.split(',')

			fs.mkdir(dirname, function() {
				_arr.map((name) => {
					console.log(name)
					fs.readFile(`./mycom/${name}.vue`, function(err, data) {
						fs.writeFile(dirname + '/' + name + '.vue', data, function() {
							nowdd++;
							//全部写入则压缩
							if(nowdd == _arr.length) {
								let zipname = 'dowload.zip'
								compressing.zip.compressDir(dirname, './' + zipname)
									.then(() => {
										//压缩完成后返回给使用者
										fs.readFile('./' + zipname, function(err, data) {
											//需要设置响应头，告诉浏览器为压缩文件
											response.writeHead(200, {
												'Content-type': 'application/x-zip-compressed'
											})
											response.end(data)
										})
									})
							}
						})
					})

				})
			})
			break;
		case '/c':
			break;
		default:
			response.end('404')
			break;

	}

}).listen(3300)