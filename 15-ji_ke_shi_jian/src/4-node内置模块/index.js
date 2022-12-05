const EventEmitter = require('events').EventEmitter
// 观察者模式
class Broadcast extends EventEmitter {
  constructor() {
    super()
    setInterval(() => {
      this.emit('newlesson', { price: (Math.random() * 100).toFixed(2) })
    }, 3000)
  }
}

const myBroadcast = new Broadcast()

myBroadcast.addListener('newlesson', (e) => {

  if (e.price < 20) {
    console.log('我直接买爆', e)
  } else {
    console.log('太贵了吧', e)

  }
})