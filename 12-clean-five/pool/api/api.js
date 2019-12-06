import {
  get,
  post,
  jsonPost,
} from '@/utils/http';
import {
  host,
  unifyHost,
} from '@/config';
// 大部分接口前缀都是/mine开头的,部分是/user等开头的
// 区分币种，在接口前面添加币种标识，如bhd的接口/mine/all/volume改为/vbhd/mine/all/volume
const mapMeniTypePath = (args) => {
  if (!args || !args.mineType) {
    return '';
  }
  const mineType = args.mineType;
  if (args && args.mineType) {
    if (/eco/i.test(mineType)) {
      return `/v${mineType.replace(/eco/i, '')}/eco`;
    }
    return `/v${mineType}`;
  }
  return '';
};
// 区分币种的接口前缀
const prefix = (args) => {
  return host + mapMeniTypePath(args);
};
// 不区分币种的接口前缀
const unifyPrefix = (args) => {
  return unifyHost;
};
// 部分不区分币种的接口需要加上/vbhd
const userInfoPrefix = (args) => {
  return host + '/vbhd';
};
const api = {

  /**
   *不分币种统一的接口 开始
   * */
  // v3.0首页图片
  homePic: args => get(`${unifyPrefix(args)}/minepool/pics`, args),

  // 获取币种接口
  mineTypeList: args => get(`${unifyPrefix(args)}/minepool/cointypes`, args),

  // 帮助
  help: args => get(`${unifyPrefix(args)}/minepool/res/helps`, args),

  // 公告
  noticeList: args => get(`${unifyPrefix(args)}/minepool/res/news`, args),

  // 挖矿软件工具
  toolsList: args => get(`${unifyPrefix(args)}/minepool/res/tools`, args),

  // 挖矿教程
  courseList: args => get(`${unifyPrefix(args)}/minepool/res/docs`, args),


  /**
   *不分币种统一的接口 结束
   * */

  /**
   *用户信息相关接口 固定加前缀/vbhd  开始
   * */
  // 获取用户个人信息
  userInfo: args => post(`${userInfoPrefix(args)}/mine/account/user/profile`, args),

  // 用户注册接口 参数 system、mobile、mail、password
  userRegister: args => post(`${userInfoPrefix(args)}/user/_guest/register`, args),

  // 用户注册获取邮箱验证码 参数 mail
  getUserRegisterMialCode: args => post(`${userInfoPrefix(args)}/user/_guest/mine/send/mail/code`, args),

  // 验证图形验证码
  validateImgCode: args => post(`${userInfoPrefix(args)}/user/_guest/graphic/validateCode`, args),

  // 发送验证码接口 参数phone system
  sendPhoneCode: args => get(`${userInfoPrefix(args)}/user/_guest/mine/send/validate/code`, args),

  // 找回密码接口 参数 code、phone、system、pwd
  userRetrievePassword: args => post(`${userInfoPrefix(args)}/user/_guest/mine/retrieve/password`, args),

  // 设置邮箱
  setMail: args => post(`${userInfoPrefix(args)}/user/_guest/mine/binding/mail`, args),

  // 修改个人信息
  // String userName(用户名)
  setUserName: args => post(`${userInfoPrefix(args)}/user/_guest/mine/userName`, args),

  // 修改密码
  // String code验证码,String system系统码 ,String account邮箱或手机号, String pwd 密码
  setUserPassword: args => post(`${userInfoPrefix(args)}/user/_guest/mine/password`, args),

  // 修改手机号或邮箱
  // String code验证码,String system系统码,String account(账户)
  setPhoneOrMail: args => post(`${userInfoPrefix(args)}/user/_guest/mine/modify`, args),

  // 图形验证码接口
  imgCode: args => post(`${userInfoPrefix(args)}/other/validatecode`, args),

  // 手机验证码登录接口 参数phone、code、openId
  userCodeLogin: args => post(`${userInfoPrefix(args)}/user/_guest/mine/mobile/login`, args),

  // 账号密码登录接口 参数 system、accountaccount、pwd
  userAcountLogin: args => post(`${userInfoPrefix(args)}/user/_guest/mine/new/acount/login`, args),

  // 未读消息个数
  msgCount: args => post(`${userInfoPrefix(args)}/mine/message/news/unread`, args),

  // 消息列表
  msgList: args => post(`${userInfoPrefix(args)}/mine/message/news`, args),

  // 标记所有消息为已读
  clearAllMsg: args => post(`${userInfoPrefix(args)}/mine/message/all/status`, args),

  // 更改消息状态
  changeMsgStatus: args => post(`${userInfoPrefix(args)}/mine/message/news/status`, args),

  // 校验支付密码   参数： payPwd
  checkPayPassword: args => post(`${userInfoPrefix(args)}/mine/account/check`, args),

  // 修改支付密码
  // String code验证码,String system系统码 ,String account邮箱或手机号, String pwd 密码
  setUserPayPassword: args => post(`${userInfoPrefix(args)}/mine/account/save/pay`, args),

  // 更新API Key
  updateApiKey: args => post(`${userInfoPrefix(args)}/mine/observer/updateApiKey`, args),

  // 获取观察者链接信息
  getObserverLink: args => post(`${userInfoPrefix(args)}/mine/observer/getMineObserverVo`, args),

  // 获取观察者页面用户信息 参数 apiKey
  getMineObserverUserId: args => post(`${userInfoPrefix(args)}/mine/observer/getMineObserverUserId`, args),
  /**
   *用户信息相关接口 固定加前缀/vbhd  结束
   * */

  // v3.0首页获取矿池的信息
  homePoolInfo: args => get(`${prefix(args)}/mine/pool`, args),

  // v3.0首页全网算力 type=7 7表示周  30表示月
  allVolume: args => get(`${prefix(args)}/mine/netcapacity`, args),


  // 首页最近挖到的区块 参数 page=1&pageSize=20
  latelyBlock: args => get(`${prefix(args)}/mine/block`, args),

  // 首页生态池最近挖到的区块 参数 page=1&pageSize=20 mineType
  latelygreenBlock: args => get(`${prefix(args)}/mine/eco/block`, args),

  // 我的首页 获取配置信息
  getRateConfig: args => get(`${prefix(args)}/mine/mortgage/getRateConfig`, args),

  // 我的首页 收益
  homepageProfit: args => get(`${prefix(args)}/mine/homepage/profit`, args),

  // 我的首页 矿机在线率
  onlineRate: args => get(`${prefix(args)}/mine/homepage/online/rate`, args),

  // 我的首页 矿机信息
  mineOnline: args => get(`${prefix(args)}/mine/homepage/mine/online`, args),

  // 我的矿机 参数page=1、pageSize=20
  myMinerList: args => get(`${prefix(args)}/mine/manager/list`, args),

  // 删除矿机 参数id(矿机id=1)
  deleteMiner: args => jsonPost(`${prefix(args)}/mine/manager/delete`, args),

  // 更新矿机 参数id(矿机id=1)
  refreshMiner: args => post(`${prefix(args)}/mine/manager/batchUpdate`, args),

  // 绑定查询
  // Integer mineType(币种)
  bindQuery: args => get(`${prefix(args)}/mine/mortgage/query/binding`, args),

  // 绑定操作
  // String coinAddr(绑定的钱包地址), Integer mineType(币种)
  bindWalletHandle: args => post(`${prefix(args)}/mine/mortgage/binding`, args),

  // 数据查询页面开始 ----->

  // 查询用户充值列表
  getRechargeList: args => post(`${prefix(args)}/mine/data/recharge/list`, args),

  // 查询用户提现列表
  getCashList: args => post(`${prefix(args)}/mine/data/cash/list`, args),

  // 爆块信息
  getVipBlockInfo: args => get(`${prefix(args)}/data/query/result/list`, args),

  // 主矿池DL贡献点
  getMainDlDontributionPoints: args => get(`${prefix(args)}/data/query/result/getDlDontributionPoints`, args),

  // 生态池DL贡献点
  getEcoDlDontributionPoints: args => get(`${prefix(args)}/data/query/result/getDlDontributionPoints`, args),

  // 删除未绑定矿机
  deleteAddress: args => post(`${prefix(args)}/mine/mortgage/bind/status`, args),

  // 借入记录
  borrowRecord: args => post(`${prefix(args)}/mine/data/borrow/record`, args),

  // 每日总收益
  totalIncome: args => get(`${prefix(args)}/data/query/queryDailyTotalRevenue`, args),

  // 定投收益明细
  timeDepositDetail: args => get(`${prefix(args)}/data/query/queryFundPledgeEarnings`, args),

  // 合作订单
  getWorkOrders: args => get(`${prefix(args)}/data/query/queryMineLeaseOrder`, args),

  // 定投订单
  getTimeDepositOrders: args => get(`${prefix(args)}/data/query/queryFundPledgeOrder`, args),

  // 查询用户挖矿收益明细列表
  getProfitList: args => get(`${prefix(args)}/data/query/queryMiningEarningsDetail`, args),

  // 查询用户合作投放明细
  getLeaseList: args => get(`${prefix(args)}/data/query/queryLeaseIncomeRecord`, args),

  // 查询用户划转记录
  getMortgageRecord: args => get(`${prefix(args)}/data/query/getMortgageRecord`, args),

  // 提醒审核
  doReviewed: args => get(`${prefix(args)}/mine/mortgage/reviewed`, args),

  // 数据查询页面结束

  // 新资金管理页面开始 ----->
  // 划转到抵押 参数：conin mineType
  getToApply: args => get(`${prefix(args)}/mine/mortgage/apply`, args),

  // 提现 参数：conin mineType
  getCash: args => post(`${prefix(args)}/mine/mortgage/cash`, args),

  // 获取矿池地址 参数：mineType
  getPoolAddress: args => post(`${prefix(args)}/mine/wallet/generate/address`, args),

  // 获取抵押,理论抵押,出租金额,租借金额数量 参数：mineType
  getMortgageLeaseCount: args => get(`${prefix(args)}/mine/mortgage/quantity`, args),

  // 获取收益分配比例(新) 参数： mineType
  getIncomeRate: args => get(`${prefix(args)}/mine/mortgage/distribution/rate`, args),

  // 划转到余额 参数：conin、mineType
  getToRedeem: args => get(`${prefix(args)}/mine/mortgage/redeem`, args),

  // 修改用户钱包地址 参数： mineType、newAddress、code、system、phone
  getUpdateWalletAddr: args => get(`${prefix(args)}/mine/mortgage/update/wallet`, args),

  // 获取用户钱包地址   参数： mineType
  getUserWalletAddr: args => get(`${prefix(args)}/mine/mortgage/wallet/address`, args),

  // 绑定校验
  bindVerify: args => get(`${prefix(args)}/mine/mortgage/verifybindplotterdata`, args),

  // 获取借入账户信息
  newBorrowInfo: args => get(`${prefix(args)}/mine/borrow/coin/info`, args),

  // 获取用户借入金额钱包地址
  getBorrowAddress: args => get(`${prefix(args)}/mine/mortgage/borrow/address`, args),

  // 设置用户借入金额钱包地址
  setBorrowAddress: args => post(`${prefix(args)}/mine/mortgage/update/borrow/wallet`, args),

  // 取消提现
  cancelWithdrawal: args => post(`${prefix(args)}/mine/mortgage/cancel/withdrawal`, args),

  // 新资金管理页面结束 ----->

  // 新版合作挖矿接口开始

  // 合作挖矿投放
  addLeaseOrder: args => jsonPost(`${prefix(args)}/mine/cooperative/mining/period/addNewLeaseOrder`, args),

  // 投放预计收益
  throwInIncome: args => jsonPost(`${prefix(args)}/mine/rate/config/calculateTotalEarningsToMoreDay`, args),

  // 新版合作挖矿接口结束

  // 同意协议
  submitSigned: args => post(`${prefix(args)}/mine/deal/signed`, args),

  // 用户定投操作
  userDeliveryHandle: args => post(`${prefix(args)}/mine/regular/delivery/regular/put`, args),

  // 活期宝相关接口 ------->

  // 活期宝存入
  userWriteFreedom: args => post(`${prefix(args)}/mine/freedom/fund/deposit`, args),

  // 活期宝取出
  userReadFreedom: args => post(`${prefix(args)}/mine/freedom/fund/withdraw`, args),

  // 活期宝用户信息
  getUserInfoFreedom: args => post(`${prefix(args)}/mine/freedom/fund/userInfo`, args),

  // 文案数据,参数writeType文案类型(1充值 2借入 3提现 4抵押申请 5抵押赎回 6绑定查询 7活期宝 8=活期宝描述文案 9=定投 10=合作挖矿)
  getWrite: args => get(`${prefix(args)}/mine/mortgage/write`, args),

  // 增值专区
  getAppreciation: args => get(`${prefix(args)}/data/query/getAppreciation`, args),
  // 活期宝
  getFreedomFundOrder: args => get(`${prefix(args)}/mine/freedom/fund/order/getFreedomFundOrder`, args),
  // 合作挖矿
  getCooperativeMining: args => get(`${prefix(args)}/mine/cooperative/mining/period/getCooperativeMining`, args),
  // 定投
  getNewFundPledgePlan: args => get(`${prefix(args)}/mine/fund/pledge/plan/getNewFundPledgePlan`, args),
  // 获取用户在线T数
  getOnlineVolume: args => get(`${prefix(args)}/mine/manager/online/volume`, args),
  // 矿池钱包地址
  homepagePoolAddress: args => get(`${prefix(args)}/mine/homepage/pool/address`, args),

};


export default api;
