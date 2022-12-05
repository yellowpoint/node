const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')

const app = new koa();
// __dirname既然它就是源代码目录，感觉不用加呀，直接./不行么？不行，这里要一个绝对路径
app.use(static(__dirname + '/source/'))

app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
  })
)

app.listen(3000)