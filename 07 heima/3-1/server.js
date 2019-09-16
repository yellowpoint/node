const net = require('net')

const server = net.createServer()

server.on('connection', clientSocket => {
	console.log('有新的连接进来了')
	//接受客户端发的数据

	clientSocket.on('data', data => {
		//默认是二进制，需要tostring
		console.log(data.toString())
	})

	//通过clientSocket给当前连接的客户端发送数据
	clientSocket.write('hello')

})

server.listen(3000, () => {
	console.log('服务运行在 127.0.0.1 3000')
})