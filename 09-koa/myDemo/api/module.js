module.exports = {
  /* 
        @name   getData
        @params 
            url url
        @desc   获取数据服务器数据
    */
  async getData2(ctx) {
    let res = await ctx.axios.get((url = 'http://api.server.com'))
    return res
  },
  async getData(ctx) {
    const url = `https://api.51app.cn/gameapi/game/home`
    const url2 = `https://api.51app.cn/gameapi/game/list`
    let newObj = {
      code: 200,
      data: {}
    }
    try {
      let [obj, obj2] = await Promise.all([
        ctx.axios.get(url),
        ctx.axios.get(url2)
      ])
      newObj.data.home = obj.data
      newObj.data.list = obj2.data
    } catch (err) {
      console.log('发生了error', err)
    }
    console.log('newObj', newObj.code)
    return newObj.data
  },
  async getPool(ctx) {
    //要用户 
    let res = await ctx.axios.get('https://api.awpool.com/mine/message/news/unread')
    // let res = await ctx.axios.get('http://api.awpool.com/test/minepool/pics')
    if (res.code != 200) {
      console.log('res', res)
    }

    return res
  }
}