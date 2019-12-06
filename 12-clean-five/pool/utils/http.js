import qs from 'qs';
import axios from 'axios';

import $commonLogic from '@/utils/commonLogic';
import store from '@/store/index';
import Toast from '@/components/toast/index';
import regPopup from '@/components/regPopup/index';


axios.defaults.timeout = 30000; // 超时时间30s
const pipe = p => {
  return new Promise((reslove, reject) => p.then(o => {
    const r = o.data;
    // 此处用相等不用全等，兼容字符串的'200'
    if (r.code == 200) {
      reslove(r.data);
    } else {
      if (r.code == 1000) {
        Toast('请登录！');
        store.dispatch('setUserInfo', null).then(res => {
          // location.reload();
          regPopup({
            popupType: 'accountLogIn',
          });
        }).catch(err => {
          store.dispatch('setUserInfo', null);
          location.reload();
          console.log(err);
        });
      } else if (r.code == 10023) { // 提示同步时间
        if (r.msg) {
          Toast({
            text: r.msg,
            duration: 5000,
          });
        } else {
          Toast('哎哟~出错了~请稍后再试~');
        }
      } else {
        if (r.msg) {
          Toast(r.msg);
        } else {
          Toast('哎哟~出错了~请稍后再试~');
        }
      }
      reject(r);
    }
  }).catch(e => {
    let str = '网络繁忙，请刷新重试';
    if (e.toString().includes('timeout of')) {
      str = '请求超时';
    }
    Toast(str);
  }));
};

// 加上pos请求的请求头
let postConfig = {};
const resetHeaders = function () {
  postConfig = {
    headers: $commonLogic.getAjaxHeaders() || {},
  };
};

const post = (url, arg = {}) => {
  // 每一次请求前都要重置请求头
  resetHeaders();
  return pipe(axios.post(url, qs.stringify({
    ...arg,
  }), postConfig));
};
const jsonPost = (url, arg = {}) => {
  // 每一次请求前都要重置请求头
  resetHeaders();
  postConfig.headers['Content-Type'] = 'application/json';
  return pipe(axios.post(url, JSON.stringify(arg), postConfig));
};
const get = (url, arg = {}) => {
  resetHeaders();
  return pipe(axios.get(arg ? `${url}?${qs.stringify({ ...arg,
  })}` : url, postConfig));
};
const put = (url, arg = {}) => {
  return pipe(axios.put(url, qs.stringify({
    ...arg,
  })));
};
const del = (url, arg = {}) => {
  return pipe(axios.delete(url, {
    params: {
      ...arg,
    },
  }));
};
const postForm = (url, args = {}) => {
  const o = new FormData();
  const arg = {
    ...args,
  };
  Object.keys(arg).forEach(k => {
    if (arg[k] instanceof Array) {
      arg[k].forEach(v => {
        o.append(k, v);
      });
    } else {
      o.append(k, arg[k]);
    }
  });
  return pipe(axios.post(url, o, {
    'Content-Type': 'multipart/form-data',
  }));
};

/* 带进度获取的form提交 */
const stepForm = (url, args = {}, fn) => {
  const o = new FormData();
  const arg = {
    ...args,
  };
  Object.keys(arg).forEach(k => {
    if (arg[k] instanceof Array) {
      arg[k].forEach(v => {
        o.append(k, v);
      });
    } else {
      o.append(k, arg[k]);
    }
  });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: null,
    onUploadProgress: function (e) {
      // eslint-disable-next-line no-unused-expressions
      fn && fn(Math.round(e.loaded * 100 / e.total));
    },
  };
  return pipe(axios.post(url, o, config));
};

export {
  post,
  get,
  put,
  del,
  postForm,
  stepForm,
  resetHeaders,
  jsonPost,
};
