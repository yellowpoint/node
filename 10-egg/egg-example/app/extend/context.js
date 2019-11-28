'use strict';

module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
  // async get(_this,url) {
  //   console.log('aaaaa', this);
  //   const headers = this.request.header;
  //   headers.host = '';
  //   // console.warn('headers', headers);
  //   const result = await this.curl(url, {
  //     dataType: 'json',
  //     headers,
  //   });
  //   this.logger.info('some request data: %j', this.request.body);
  //   return result.data;
  // },
  // async get(_this, url) {
  //   const ctx = _this;
  //   console.log('ggggg', _this);
  //   const headers = ctx.header;
  //   headers.host = '';
  //   // console.warn('headers', headers);
  //   const result = await ctx.curl(url, {
  //     dataType: 'json',
  //     headers,
  //   });
  //   ctx.logger.info('some request data: %j', ctx.request.body);
  //   return result.data;
  // },
};
