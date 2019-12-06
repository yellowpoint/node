// 一些公共的业务逻辑方法
// Object.freeze，它做的事情是阻止这个对象在未来被修改。
import sha1 from './lib/sha1';
import store from '@/store/index';

const commonLogic = Object.freeze({
  // 获取请求头，用户登录信息
  getAjaxHeaders() {
    let headers = {};
    // 若参数不全 里面报错的话就设为空
    try {
      const timestamp = new Date().getTime().toString();
      const userInfo = store.getters.userInfo;
      if (!userInfo) {
        return headers;
      }
      const sign = sha1.hex_sha1(timestamp + userInfo.userToken + userInfo.secret);
      headers = {
        // 所有接口的鉴权需要加上版本号区别于老项目
        'x-version': '1.0.0',
        'x-system': 'mine',
        'x-sign': sign,
        'x-user-token': userInfo.userToken,
        'x-timestamp': timestamp,

      };
    } catch (e) {
      console.log(e);
      headers = {};
    }

    return headers;
  },

});

export default commonLogic;
