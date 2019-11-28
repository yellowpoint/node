'use strict';

module.exports = {
  async get(url) {
    const {
      ctx,
    } = this;
    const headers = ctx.request.header;
    headers.host = '';
    const result = await ctx.curl(url, {
      dataType: 'json',
      headers,
    });
    ctx.logger.info('some request data: %j', ctx.request.body);
    return result.data;
  },

};
