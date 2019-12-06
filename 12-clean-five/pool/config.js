/**
 *开发接口前缀
 *
 * * */
// const devHost = '//192.168.119.120:9149'
// const devHost = '//192.168.100.50:8090'; // 罗新齐接口
// const devHost = '//192.168.3.193:8096'; // 罗尧超接口
// const devHost = '//47.110.236.201:9142';//线上测试
// 都做了代理 若需要修改ip需要到 config/index.js修改
// 通过proxyTable来跨域请求本地接口
// const devHost = '/apiProxy_local';
const devHost = '/apiProxy_online';
// const devHost = '/mock'

// 不分币种统一的接口
const dev_unifyHost = '/apiProxy_unify';

// 生产接口前缀
const proHost = '//api.awpool.com/test';

const host = process.env.NODE_ENV === 'production' ? proHost : devHost;
const unifyHost = process.env.NODE_ENV === 'production' ? proHost : dev_unifyHost;

export {
  host,
  unifyHost,
};
