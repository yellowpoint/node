const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser'); // 引入json解析中间件
const multer = require('multer'); //上传文件的 
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize('yellowpoint', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		charset: 'utf8',
		timestamps: false,
		paranoid: true //虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
		//  freezeTableName: true //默认情况下，sequelize会把王model的名字根据table的名字设置成复数形式，如果你不想要这样的话，就要做这个配置

	}
});

var app = express(); //express对象
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	if(req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
	else next();
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const News = sequelize.define('news', {
	title: {
		type: Sequelize.STRING
	},
	img: {
		type: Sequelize.STRING
	},
	time: {
		type: Sequelize.DATE
	},
	department: {
		type: Sequelize.STRING
	},
	intro: {
		type: Sequelize.STRING
	}
	//	,
	//	status: {
	//		type: Sequelize.BOOLEAN,
	//		defaultValue: 1
	//	}
});
//News.sync()
////第一次建表的时候执行这个；后面就不用了，不然会重置表
//News.sync({	
//	force: true  //表存在则删除重建
//}).then(() => {
//	// 表已创建
//	return News.create({
//		'title': '1111',
//		'img': '/g/g/g',
//		'time': '2018-05-19',
//		'department': '商务部',
//		'intro': '5月19日上午9点，南京工业大学青创校友联盟成立大会在南工大江浦校区行政楼104会议室举行。校长乔旭教授致辞。乔校长简要介绍了学校近年来发展现状，鼓励青年校友传承学校创新创业基因，深化产教融合，在为社会做贡献中不忘回馈母校。'
//	})
//});

//查
app.all('/findAll', function(req, res, next) {
	let id = req.param('id')
	if(id) {
		News.findById(id)
			.then((news) => {
				res.send({
					code: 0,
					data: news
				})
			})
		return;
	}

	News.findAll()
		.then((news) => {
			//数据按照时间排序，越近的在前面
			news = news.sort(function(a, b) {
				return new Date(b.time) - new Date(a.time);
			});
			res.send({
				code: 0,
				data: news
			})
		})
});

//增
app.all('/addNews', function(req, res, next) {
	// req.param('name') get post都能取到值
	News.create({
			'title': req.param('title'),
			'img': req.param('img'),
			'time': req.param('time'),
			'department': req.param('department'),
			'intro': req.param('intro')
		})
		.then(() => {
			News.findAll()
				.then((news) => {
					//数据按照时间排序，越近的在前面
					news = news.sort(function(a, b) {
						return new Date(b.time) - new Date(a.time);
					});
					res.send(news)
				})

		})

});
//删
app.all('/deleteNews', function(req, res, next) {
	//	News.update({
	//			status: 0
	//		}, {
	//			where: {
	//				id: req.param('id')
	//			}
	//		}).then(news => {
	//
	//			res.send({
	//				code: 200
	//			})
	//		})
	//		.catch(() => {
	//			res.send({
	//				code: -1
	//			})
	//		})
	News.destroy({
			where: {
				id: req.param('id')
			}
		})
		.then(() => {
			res.send({
				code: 200
			})
		})
		.catch(() => {
			res.send({
				code: -1
			})
		})

});

//改
app.all('/updateNews', function(req, res, next) {

	// req.param('name') get post都能取到值

	let reqData = {
		'title': req.param('title'),
		'img': req.param('img'),
		'time': req.param('time'),
		'department': req.param('department'),
		'intro': req.param('intro')
	}

	News.update(reqData, {
			where: {
				id: req.param('id')
			}
		}).then(() => {
			res.send({
				code: 200
			})
		})
		.catch(() => {
			res.send({
				code: -1
			})
		})

});

// 配置接收的文件在服务器的临时存放路径, any() 接收所有, 还有其他配置
app.use(multer({
	dest: './web/upload/img/'
}).any());
// 响应请求, 基本的业务逻辑
app.use("/uploadImg", function(req, res, next) {
	let ext = path.parse(req.files[0].originalname).ext; // 获取上传文件的扩展名
	let newFile = req.files[0].path + ext; // 组装新文件名
	fs.rename(req.files[0].path, newFile, function(err) { // 重命名上传的文件
		if(err) {
			res.send('-1');
		} else {
			res.send({
				code: 200,
				data: {
					path: newFile,
					allPath: 'http://120.25.205.164:8080\\' + newFile.substring(4)
				}
			})
		}
		res.end();
	});
});

app.listen(3001, function() { //服务端口监听
	console.log('server now listening at port 3001');
});