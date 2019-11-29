/**
 * 配置本地开发与线上生产的接口前缀
 * 
 * **/
//开发接口前缀

// 罗尧超 本机接口
// const devHost = '//192.168.3.212:8092'
const devHost = '//api-tdd.51app.cn'

// 120服务器
// const devHost = "//192.168.119.120:9240";
//罗新齐 本机接口
// const devHost = '//192.168.100.50:8090'
//孙卫民 本机接口
// const devHost = '//192.168.100.11:8093'
//袁琪 本机接口
// const devHost = "//192.168.100.7:8090";

//生产接口前缀
// const proHost = '//api-tdd.51app.cn'
const proHost = '//192.168.119.120:9240'
// const proHost = "//resume.51app.cn/resumeapi/test";

const  proHost_other = 'https://tdd.51app.cn/tbkauth2ndstepandbindtb' //淘宝授权线上
const  devHost_other = '//192.168.100.105:7777' //淘宝授权线下

const  proHost_iWantUp = '//tdd.51app.cn' //我要升级线上
const  devHost_iWantUp = '//192.168.100.13:8080' //我要升级线下

const host = process.env.NODE_ENV === "production" ? proHost : devHost;
const host_other = process.env.NODE_ENV === "production" ? proHost_other : devHost_other;

const host_iWantUp = process.env.NODE_ENV === "production" ? proHost_iWantUp : devHost_iWantUp;




export {
  host,
  host_other,
  host_iWantUp
};
