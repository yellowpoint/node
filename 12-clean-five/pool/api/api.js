import { post, jsonPost } from '@/utils/http'

const api = {
	
	// 矿池项目接口开始

	// 用户注册接口 参数 system、mobile、mail、password
	userRegister: args => post('/user/_guest/register', args),

	// 验证图形验证码
	validateImgCode: args => post('/user/_guest/graphic/validateCode', args),

	// 发送验证码接口 参数phone system
	sendPhoneCode: args => post('/user/_guest/mine/send/validate/code', args),
	
	// 手机验证码登录接口 参数phone、code、openId
	userCodeLogin: args => post('/user/_guest/mine/mobile/login', args),

	// 账号密码登录接口 参数 system、accountaccount、pwd
	userAcountLogin: args => post('/user/_guest/mine/new/acount/login', args),

	// 找回密码接口 参数 code、phone、system、pwd
	userRetrievePassword: args => post('/user/_guest/mine/retrieve/password', args),

	// 设置邮箱
	setMail: args => post('/user/_guest/mine/binding/mail', args),


	// 全网算力接口
	allVolume: args => post('/mine/all/volume', args),

	// 首页获取矿池的信息 参数 vip 0 1
	poolVolume: args => post('/mine/pool', args),

	// 首页最近挖到的区块 参数 page=1&pageSize=20
	latelyBlock: args => post('/mine/block', args),

	// 首页生态池最近挖到的区块 参数 page=1&pageSize=20 mineType
	latelygreenBlock: args => post('/mine/eco/block', args),

	//矿池容量排行
	pollVolumeRanking: args => post('/mine/volume', args),

	// 我的首页 矿机在线率
	onlineRate: args => post('/mine/homepage/online/rate', args),

	// 我的首页 矿池信息
	poolInfo: args => post('/mine/homepage/pool/info', args),

	// 我的首页 获取总收益
	totalRevenue: args => post('/mine/account/total/revenue', args),

	// 我的首页 矿机信息
	mineOnline: args => post('/mine/homepage/mine/online', args),

	// 我的首页 是否需要算力绑定
	isBinding: args => post('/mine/homepage/force/binding', args),
	
	//我的矿机 参数page=1、pageSize=20
	myMinerList: args => post('/mine/manager/list', args),

	//删除矿机 参数id(矿机id=1)
	deleteMiner: args => jsonPost('/mine/manager/delete', args),

	//更新矿机 参数id(矿机id=1)
	refreshMiner: args => post('/mine/manager/batchUpdate', args),

	// 获取观察者页面用户信息 参数 apiKey
	getMineObserverUserId: args => post('mine/observer/getMineObserverUserId', args),

	//绑定查询 
	//Integer mineType(币种)
	bindQuery: args => post('/mine/mortgage/query/binding', args),

	//绑定操作 
	//String coinAddr(绑定的钱包地址), Integer mineType(币种)
	bindWalletHandle: args => post('/mine/mortgage/binding', args),

	//获取用户个人信息
	userInfo: args => post('/mine/account/user/profile', args),

	//修改个人信息
	//String userName(用户名)
	setUserName: args => post('/user/_guest/mine/userName', args),

	//修改密码
	//String code验证码,String system系统码 ,String account邮箱或手机号, String pwd 密码
	setUserPassword: args => post('/user/_guest/mine/password', args),

	//修改支付密码
	//String code验证码,String system系统码 ,String account邮箱或手机号, String pwd 密码
	setUserPayPassword: args => post('/mine/account/save/pay', args),

	//修改手机号或邮箱
	//String code验证码,String system系统码,String account(账户)
	setPhoneOrMail: args => post('/user/_guest/mine/modify', args),

	// 更新API Key
	updateApiKey: args => post('/mine/observer/updateApiKey', args),

	// 获取观察者链接信息
	getObserverLink: args => post('/mine/observer/getMineObserverVo', args),

	// 图形验证码接口
	imgCode: args => post('/other/validatecode', args),

	// 数据统计页  最近爆块 参数displayType 1 24小时 2 30天   mineType 币种  1BHD
	bombBlock: args => post('/mine/data/block', args),

	// 数据统计页  最近算力 参数displayType 1 24小时 2 30天   mineType 币种  1BHD
	latelyPower: args => post('/mine/data/calculation/power', args),

	// 数据统计页  每日收益 参数displayType 
	averageRate: args => post('/mine/data/profit', args),

	// 数据统计页  最近30天投放分成率 参数displayType 
	divideInto: args => post('/mine/data/recent/rate', args),
	
	// 资源中心 ?page=1&pageSize=10
	getResourceInfo: args => post('/mine/resource/list', args),

	// 帮助
	help: args => post('/mine/message/problem/help', args),

	// 帮助点赞 
	helpLike: args => post('/mine/message/use/count', args),

	// 未读消息个数
	msgCount: args => post('/mine/message/news/unread', args),

	// 消息列表
	msgList: args => post('/mine/message/news', args),

	// 标记所有消息为已读
	clearAllMsg: args => post('/mine/message/all/status', args),
	
	// 更改消息状态
	changeMsgStatus: args => post('/mine/message/news/status', args),

	// 公告
	noticeList: args => post('/mine/message/notice', args),

	// vip申请
	getVip: args => post('/mine/vip/info', args),

	// 数据查询页面开始 ----->
	// 查询用户收益列表
	getProfitList: args => post('/mine/data/profit/list', args),

	// 查询用户租借列表
	getLeaseList: args => post('/mine/data/lease/list', args),

	// 查询用户充值列表
	getRechargeList: args => post('/mine/data/recharge/list', args),
	
	// 查询用户提现列表
	getCashList: args => post('/mine/data/cash/list', args),

	// 爆块信息
	getVipBlockInfo: args => post('/mine/data/result/list', args),

	// 主矿池DL贡献点
	getMainDlDontributionPoints: args => post('/mine/data/result/getMainDlDontributionPoints', args),

	// 生态池DL贡献点
	getEcoDlDontributionPoints: args => post('/mine/data/result/getEcoDlDontributionPoints', args),

	// 删除未绑定矿机
	deleteAddress: args => post('/mine/mortgage/bind/status', args),
	
	// 借入记录
	borrowRecord: args => post('/mine/data/borrow/record', args),

	// 每日总收益
	totalIncome: args => post('/mine/data/daily/income', args),

	// 定投收益明细
	timeDepositDetail: args => post('/mine/regular/delivery/getFundPledgeEarningsList', args),

	// 数据查询页面结束

	//新资金管理页面开始 ----->
	// 划转到抵押	参数：conin mineType
	getToApply: args => post('/mine/mortgage/apply', args),

	// 绑定操作		参数：prePwd mineType
	getBinding: args => post('/mine/mortgage/binding', args),

	// 提现		参数：conin mineType
	getCash: args => post('/mine/mortgage/cash', args),

	// 获取矿池地址 	参数：mineType
	getPollAddress: args => post('/mine/wallet/generate/address', args),

	// 获取抵押,理论抵押,出租金额,租借金额数量 	参数：mineType
	getMortgageLeaseCount: args => post('/mine/mortgage/quantity', args),

	// 获取绑定查询列表 	参数：page、pageSize、mineType
	getBindingQueryList: args => post('/mine/mortgage/query/binding', args),

	// 获取抵押率	参数:mineType
	getRate: args => post('/mine/mortgage/rate', args),

	// 获取收益分配比例(新)		参数： mineType
	getIncomeRate: args => post('/mine/mortgage/distribution/rate', args),

	// 获取爆块收益		参数： mineType
	getBlockIncome: args => post('/mine/mortgage/block/profit', args),

	// 获取租借收益		参数： mineType
	getRentalIncome: args => post('/mine/mortgage/getRentalIncomeVo', args),

	// 划转到余额	参数：conin、mineType 
	getToRedeem: args => post('/mine/mortgage/redeem', args),

	// 已支付违约金	参数：conin、mineType 
	paidDebit: args => post('/mine/mortgage/damages/paid', args),
	
	// 修改用户钱包地址 参数： mineType、newAddress、code、system、phone
	getUpdateWalletAddr: args => post('/mine/mortgage/update/wallet', args),

	// 获取账户余额,今日贡献(今日收益)		参数： mineType
	getUserBalance: args => post('/mine/mortgage/user/balance', args),

	// 获取用户钱包地址		参数： mineType
	getUserWalletAddr: args => post('/mine/mortgage/wallet/address', args),

	// 校验支付密码		参数： payPwd
	checkPayPassword: args => post('/mine/account/check', args),

	// 绑定校验
	bindVerify: args => post('/mine/mortgage/verifybindplotterdata', args),

	// 获取余额信息
	borrowInfo: args => post('/mine/borrow/borrow/info', args),

	// 
	newBorrowInfo: args => post('/mine/borrow/coin/info', args),

	// 获取用户借入金额钱包地址
	getBorrowAddress: args => post('/mine/mortgage/borrow/address', args),

	// 设置用户借入金额钱包地址
	setBorrowAddress: args => post('/mine/mortgage/update/borrow/wallet', args),

	// 取消提现
	cancelWithdrawal: args => post('/mine/mortgage/cancel/withdrawal', args),
	
		
	
	//新资金管理页面结束 ----->

	//租借系统开始----->

	//获取租用市场列表 page pageSize sortField
	getReleaseRentedList: args => post('/mine/lenders/order/getReleaseRentOutList', args),

	//校验是否同一周期类的订单 userId id
	verifyOrder: args => post('/mine/lenders/order/checkPeriod', args),

	//我要租用 
	needRented: args => jsonPost('/mine/lenders/order/doRent', args),

	//我要出租 
	needRentOut: args => jsonPost('/mine/rent/order/doRentOut', args),

	//获取出租方已经终止的订单 page pageSize
	getOverRentOutList: args => post('/mine/lenders/order/getTerminationOrderList', args),

	//获取出租市场列表 page pageSize sortField
	getReleaseRentOutList: args => post('/mine/rent/order/getMineRentOrderList', args),

	//获取租用订单已经终止的列表 page pageSize
	getOverRentedList: args => post('/mine/rent/order/getTerminationOrderList', args),
	
	//发布出租需求 
	releaseRentOutNeed: args => jsonPost('/mine/lenders/order/releaseRentOut', args),

	//发布租用需求 
	releaseRentedNeed: args => jsonPost('/mine/rent/order/releaseRent', args),

	//租用方默认金额 
	rentedDefaultValue: args => post('/mine/rent/order/getRentAmount', args),

	// 获取所有配置信息
	getAllConfigInfo: args => post('/mine/rate/config/getAll', args),

	// 计算收益
	computeIncome: args => post('/mine/rate/config/calculateTotalEarnings', args),

	
	// 订单管理开始----->
	
	// 出租方列表
	getRentOutList: args => post('/mine/lenders/order/getLenderOrderList', args),

	// 租用方列表
	getRentedList: args => post('/mine/rent/order/getRentOrderList', args),

	// 出租方列表详情
	getRentOutListDetail: args => post('/mine/lenders/order/getMineLenderOrderDetailsVo', args),

	// 租用方列表详情
	getRentedListDetail: args => post('/mine/rent/order/getMineRentOrderVo', args),

	// 撤销订单
	revocationOrder: args => post('/mine/lenders/order/cancelTheOrder', args),

	// 订单管理结束----->


	// 新版合作挖矿接口开始

	// 满额列表
	newMeetTheQuotaList: args => jsonPost('/mine/hire/order/getMeetTheQuotaList', args),

	// 即将释放列表
	newReleaseList: args => jsonPost('/mine/hire/order/getReleaseList', args),

	// 出租列表
	newRentOutList: args => jsonPost('/mine/hire/order/getRentOutList', args),

	// 获取倒计时
	getCountDownInfo: args => jsonPost('/mine/lease/order/getCountDownInfo', args),

	// 获取收益分成率
	getRevenueSharingRatioVo: args => post('/mine/lease/order/getRevenueSharingRatioVo', args),

	// 出租币
	addLeaseOrder: args => jsonPost('/mine/lease/order/addLeaseOrder', args),

	// 投放预计收益
	throwInIncome: args => jsonPost('/mine/rate/config/calculateTotalEarningsToMoreDay', args),

	// 新版合作挖矿接口结束

	// 新版订单管理开始
	// 获取出租订单列表数据
	getLeaseOrderList: args => post('/mine/lease/order/getLeaseOrderList', args),

	// 新版订单管理结束

	// 同意协议
	submitSigned: args => post('/mine/deal/signed', args),
	
	// 随心存利率
	followHeartRate: args => post('/mine/rate/config/followHeartRate', args),

	// 定期投放接口开始----->

	// 获取定投列表
	getDeliveryList: args => post('/mine/regular/delivery/list', args),

	// 用户定投操作
	userDeliveryHandle: args => post('/mine/regular/delivery/regular/put', args),

	// 获取用户定投记录
	getDeliveryRecord: args => post('/mine/regular/delivery/regular/record', args),

	// 获取定投用户账号信息
	getRegularIntervalsInfo: args => post('/mine/mortgage/regular/statistics', args),

	// 活期宝相关接口 ------->

	// 活期宝存入
	userWriteFreedom: args => post('/mine/freedom/fund/deposit', args),
	
	// 活期宝取出
	userReadFreedom: args => post('/mine/freedom/fund/withdraw', args),

	// 活期宝文案
	getDocumentFreedom: args => post('/mine/freedom/fund/document', args),

	// 活期宝收益列表
	getIncomeListFreedom: args => post('/mine/freedom/fund/profit', args),

	// 活期宝用户信息
	getUserInfoFreedom: args => post('/mine/freedom/fund/userInfo', args),
	
}

export default api