const net = require('net')
const socket = new net.Socket({})
socket.connect({
  host: '127.0.0.1',
  port: 4000
})
// const buffer = Buffer.alloc(2)
socket.write('1')
socket.on('data', buffer => {
  console.log('client', buffer, buffer.toString());
})