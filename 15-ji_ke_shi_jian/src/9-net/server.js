const net = require('net')

const data = {
  1: 'a',
  2: 'b'
}

const server = net.createServer(socket => {
  socket.on('data', buffer => {
    console.log('buffer', buffer, buffer.toString());
    const lessonId = data[buffer.toString()];
    console.log('lessonId', lessonId);
    socket.write(lessonId)
  })
})
server.listen(4000)