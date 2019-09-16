var mysql = require('mysql');
var express = require('express'); //引入express模块
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'hd_nodemysql'
});

var app = express(); //express对象
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	if(req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
	else next();
});

app.all('/user', function(req, res, next) {
	query(res)
});
app.all('/addUser', function(req, res, next) {
	add(res)
});

function query(appRes) {
	connection.connect();
	var sql = 'SELECT * FROM user';
	//查
	connection.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}

		console.log('--------------------------SELECT----------------------------');
		console.log(result);
		console.log('------------------------------------------------------------\n\n');

		appRes.send(result);
	});

	connection.end();

}

function add(appRes) {
	connection.connect();

	var addSql = 'INSERT INTO user(id,name,age,islive) VALUES(0,?,?,?)';
	var addSqlParams = [ '芦荟胶', '40', 'false'];
	//增
	connection.query(addSql, addSqlParams, function(err, result) {
		if(err) {
			console.log('[INSERT ERROR] - ', err.message);
			return;
		}

		console.log('--------------------------INSERT----------------------------');
		//console.log('INSERT ID:',result.insertId);        
		console.log('INSERT ID:', result);
		console.log('-----------------------------------------------------------------\n\n');
		appRes.send('插入成功')
	});

	connection.end();
}

app.listen(3000, function() { //服务端口监听
	console.log('server now listening at port 3000');
});