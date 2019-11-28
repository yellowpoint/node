const config = require('../config')
const Module = require('../api/module')
module.exports = {
  async handler(ctx, next) {
    let data = {}
    try {
      let profileInfo = await Module.getData(ctx)
      ctx.rest({
        code: 200,
        data: profileInfo
      })
    } catch (err) {
      if (err.response) {
        ctx.restError(err.response.status, err.response.data)
      } else {
        config.showError ?
          ctx.restError(500, `node error: ${err.message}`) :
          ctx.rest({
            code: 8888,
            message: data.msg
          })
      }
    }
  },
  async pool(ctx, next) {
    let data = {}
    try {
      let profileInfo = await Module.getPool(ctx)
      ctx.rest({
        code: 200,
        data: profileInfo
      })
    } catch (err) {
      if (err.response) {
        ctx.restError(err.response.status, err.response.data)
      } else {
        config.showError ?
          ctx.restError(500, `node error: ${err.message}`) :
          ctx.rest({
            code: 8888,
            message: data.msg
          })
      }
    }
  }
}