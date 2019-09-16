const net = require('net')

const client = net.createConnection({
	host: '127.0.0.1',
	port: 3000
})

client.on('connect', () => {
	console.log('连接到服务器了')
	//发送数据给服务端
	client.write('world')
})

client.on('data',data=>{
	//默认是二进制，需要tostring
	console.log(data.toString())
})
