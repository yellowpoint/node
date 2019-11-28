const Koa = require('koa')
const request = require('request-promise') //请求是异步的
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser');
const logger = require('./logger')

app.use(logger())
app.use(bodyParser());

// 全局中间件。这个地方用来处理错误
app.use(async (ctx, next) => {
  // 执行普通的路由匹配
  await next()

  // 没有匹配上任何路由，那么状态就是404
  if (ctx.status === 404) {
    ctx.body = '这是一个404页面'
  }
})


router.get('/', async (ctx, next) => {
  console.log('调用 next 匹配下一个路由')
  // 执行 next 方法，可以匹配下一个路由
  await next()
})

router.get('/', async (ctx, next) => {
  ctx.body = 'hello koa again'
})
router.get('/game', async (ctx, next) => {
  const url = `https://api.51app.cn/gameapi/game/home`
  const url2 = `https://api.51app.cn/gameapi/game/list`
  try {
    // 尝试请求转发
    // let obj = await request.get(url)
    // let obj2 = await request.get(url2)
    let [obj, obj2] = await Promise.all([
      request.get(url),
      request.get(url2)
    ])
    obj = JSON.parse(obj)
    obj2 = JSON.parse(obj2)
    obj.code = 700
    // let newObj = Object.assign({}, obj, obj2)
    let newObj = {
      code: 333,
      data: {}
    }
    newObj.data.home = obj.data
    newObj.data.list = obj2.data
    ctx.body = newObj
  } catch (err) {
    // 转发请求发送失败
    console.log('发生了error', err)
  }
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('starting at port 3000')
})