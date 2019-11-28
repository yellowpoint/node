'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const {
      ctx,
    } = this;
    console.log('this.ctx.isIOS', this.ctx.isIOS);
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}

module.exports = UserController;
