import http from '@/common/http'
import {
	host,
	host_other
} from '@/common/config'

const api = {

	// 获取用户浏览记录
	getBrowseHistory: args => http.get(`${host}/browsing/getBrowseHistory`, args),

	/*登录相关接口 */
	// 获取验证码;参数 phone;smsTypeEnum :LOGIN=登录验证码 BINDING_PHONE=绑定手机号码 WITHDRAW_DEPOSIT=提现 PHONE_REGISTER_OR_LOGIN=手机号注册/登录
	// BIND_TO_MODIFY_ALIPAY_ACCOUNT =绑定支付宝验证码
	getCode: args => http.post(`${host}/sms/_tbk/code/send`, args),
	// 手机号登录接口
	login: args => http.post(`${host}/login/phoneLogin`, args),
	// 绑定手机号
	bindingPhone: args => http.post(`${host}/user/bindingPhone`, args),
	// 手机号注册/登录
	phoneRegisterLogin: args => http.post(`${host}/login/phoneRegisterLogin`, args),
 
	// 微信授权
	wechat: args => http.post(`${host}/party/tbk/wechat/code`, args),
	// 微信授权
	wechatLogin: args => http.get(`${host}/party/wechat/login`, args),
	// 退出登录
	exit: args => http.get(`${host}/login/app/exit`, args),

	/*首页接口 */
	//首页的接口
	getHome: args => http.get(`${host}/home/getHome`, args),
	//淘宝商品查询接口
	getBeInCommonUseQuery: args => http.post(`${host}/taobao/getBeInCommonUseQuery`, args),
	//商品详情
	productDetail: args => http.get(`${host}/taobao/getTaobaoZhetkProductDetail`, args),
	//九块九查询列表
	ninePiecesOfNineList: args => http.get(`${host}/taobao/ninePiecesOfNineList`, args),
	//淘抢购列表,无排序
	getTqgList: args => http.get(`${host}/taobao/getTqgList`, args),
	//天猫查询列表
	getTianMaoList: args => http.get(`${host}/taobao/getTianMaoList`, args),
	//今日热销列表
	getTodayHotSale: args => http.get(`${host}/taobao/getTodayHotSale`, args),
	// 拼多多热销榜单 
	getPddTopGoods: args => http.get(`${host}/pdd/getPddTopGoods`, args),
	
	

	//增加收藏
	doTaobaoCollectCommodity: args => http.get(`${host}/collect/doTaobaoCollectCommodity`, args),
	//取消收藏
	doTaobaoCancelCollect: args => http.get(`${host}/collect/doTaobaoCancelCollect`, args),

	//淘宝账号授权
	bindZheTaoKe: args => http.get(`${host}/taobao/bindZheTaoKe`, args),
	//淘宝转链接
	convertLink: args => http.get(`${host}/taobao/convertLink`, args),

	//淘宝账号授权
	bindTaoBao: args => http.post(`${host}/user/bindTaoBao`, args),
	//淘宝账号授权tooken
	getToken: args => http.get(`${host_other}`, args),
	//取消授权
	cancelTaobaoAuth: args => http.post(`${host}/user/cancelTaobaoAuth`, args),

	// //为你推荐
	getToYouRecommend: args => http.get(`${host}/taobao/getToYouRecommend`, args),

	//搜索
	//热门搜索列表，参数configEnum配置类型
	// ( CHOICENESS=精选、NOVICES_REWARD=新手奖励金额、WITHDRAWAL_CHARGE=提现手续费 、 
	// MINIMUM_WITHDRAWAL_AMOUNT=最低提现金额、GENERALIZE_COMMISSION=推广佣金比例、
	// CONFIRM_THE_NUMBER_OF_DAYS=确认收货天数、NUMBER_OF_DAYS_OF_PAYMENT=付款天数、
	// PASSWORD_POP_UP_CONTENT=口令弹框内容、HOT_SEARCH=热门搜索 )
	getByType: args => http.get(`${host}/config/getByType`, args),

	/*我的页面 */
	//收藏夹
	getCollectRecord: args => http.get(`${host}/collect/getCollectRecord`, args),
	//批量删除收藏夹
	doTaobaoBatchCancelCollectHtml: args => http.post(`${host}/collect/doTaobaoBatchCancelCollectHtml`, args),
	//浏览记录
	getBrowseHistory: args => http.get(`${host}/browsing/getBrowseHistory`, args),
	//清空浏览记录
	doWipeData: args => http.get(`${host}/browsing/doWipeData`, args),

	/*用户收益相关*/
	//获取用户资产
	getUserAsset: args => http.get(`${host}/user/getUserAsset`, args),
	//用户资产变更记录 参数 incomeExpenditureType 收支类型(1=收入/2=支出) 不传为全部，pageNum页码
	getRecordVo: args => http.get(`${host}/user/asset/change/getRecordVo`, args),
	// 获取可提现金额
	getWithdrawDepositVo: args => http.get(`${host}/user/getWithdrawDepositVo`, args),
	// 发起提现，参数userId用户ID、amount提现金额、verifCode手机号登录 验证码
	doWithdrawDeposit: args => http.post(`${host}/user/doWithdrawDeposit`, args),

	// 用户详情
	getTbkUserVo: args => http.get(`${host}/user/getTbkUserVo`, args),
	//订单
	getUserOrderList: args => http.get(`${host}/user/order/getUserOrderList`, args),

	/*我要赚 */
	//我要赚图片
	getIWantToMake: args => http.get(`${host}/home/getIWantToMake`, args),

	/*分类*/
	//获取一级类目
	getFirstClassList: args => http.get(`${host}/commodity/config/getFirstClassList`, args),
	//根据id获取子类目，参数parentId，来自于上面getFirstClassList接口的id
	getByParentIdList: args => http.get(`${host}/commodity/config/getByParentIdList`, args),

	//创建淘宝分享口令
	createTaoKouling: args => http.post(`${host}/taobao/createTaoKouling`, args),
	//快捷淘宝分享接口
	createTaoKoulingTwoInOne: args => http.post(`${host}/taobao/createTaoKoulingTwoInOne`, args),
	
	//猜你喜欢
	getGuessLikeProducts: args => http.get(`${host}/taobao/getGuessLikeProducts`, args),
	
	//新手攻略
	getNewStrategy: args => http.get(`${host}/home/getNewStrategy`, args),
	//联系我们
	getContactUs: args => http.get(`${host}/home/getContactUs`, args),
	
	//商品详情-拼多多
	productDetailPidd: args => http.get(`${host}/pdd/getGoodsDetail`, args),
	
	//分享口令-拼多多
	generatePddPhrase: args => http.get(`${host}/pdd/generatePddPhrase`, args),
	// 拼多多-生成普通商品推广链接
	generateGoodsPromUrl: args => http.get(`${host}/pdd/generateGoodsPromUrl`, args),
	// 拼多多-生成红包推广链接
	generatePromUrl: args => http.get(`${host}/pdd/generatePromUrl`, args),
	// 拼多多-多多客工具生成转盘抽免单url
	getLotteryUrl: args => http.get(`${host}/pdd/getLotteryUrl`, args),
	// 获取0元购列表 
	getZeroBuyList: args => http.get(`${host}/home/getZeroBuyList`, args),
	// 获取邀请码 
	getInviteCode: args => http.get(`${host}/taobao/getInviteCode `, args),
	
	// 首页广告
	getMainRecommendList: args => http.post(`${host}/recommend/getMainRecommendList`, args),
	// 首页广告2
	getByConfigType: args => http.post(`${host}/config/getByConfigType`, args),
	
	// 升级说明
	iWantToUpgrade: args => http.get(`${host}/share/iWantToUpgrade`, args),
	// 粉丝推广
	getPromotionPageInfo: args => http.get(`${host}/share/getPromotionPageInfo`, args),
	//拼多多商品查询接口
	getPddDdkGoods: args => http.get(`${host}/pdd/getPddDdkGoods`, args),
	//获取拼多多一级类目
	getPddTwoLevelCategory: args => http.get(`${host}/commodity/config/getPddTwoLevelCategory`, args),
	//绑定或者修改支付宝账号
	bindOrModifyAlipayAccount: args => http.post(`${host}/user/bindOrModifyAlipayAccount`, args),
	//获取品牌信息
	getPinpaiRankList: args => http.get(`${host}/pin/pai/getPinpaiRankList`, args),
	//双十一会场
	dobolT: args => http.get(`${host}/config/getById`, args),
	//双十一会场2
	getD11ProductList: args => http.get(`${host}/haodan/getD11ProductList`, args),
	//京东一级分类
	getGoodsCategory: args => http.get(`${host}/jd/getGoodsCategory`, args),
	//京东精选列表
	getChoicenessGoodsList: args => http.get(`${host}/jd/getChoicenessGoodsList`, args),
	//京东搜索
	getCateGoodList: args => http.get(`${host}/jd/getCateGoodList`, args),
	//京东转短链
	jdGenerateGoodsPromUrl: args => http.get(`${host}/jd/generateGoodsPromUrl`, args),
	//现金红包创建
	createRedPacket: args => http.get(`${host}/red/packet/createRedPacket`, args),
	//现金红包分享数据
	getRedPacketShare: args => http.get(`${host}/red/packet/getRedPacketShare`, args),
	//我的现金红包信息
	getUserRedPacketWithCash: args => http.get(`${host}/red/packet/getUserRedPacketWithCash`, args),
	//升级团长
	getUpgradeDelegationInfo: args => http.get(`${host}/share/getUpgradeDelegationInfo`, args),
	
	//淘宝活动页
	getFavoriteItems: args => http.get(`${host}/taobao/getFavoriteItems`, args),
	//淘宝活动页tar
	getTaobaoActivity: args => http.get(`${host}/home/getTaobaoActivity`, args),
	//分享红包第一次有钱接口
	doDismantledRedPacket: args => http.get(`${host}/red/packet/doDismantledRedPacket`, args),
	//黑五活动
	getBlackFridayActivity: args => http.get(`${host}/activity/getBlackFridayActivity`, args),
	
	//淘宝活动ID
	createActivityLink: args => http.get(`${host}/taobao/createActivityLink`, args),
	
	//拼多多转链 numid 没有的情况
	genCmsPromUrl: args => http.get(`${host}/pdd/genCmsPromUrl`, args),
	//拼多多转链 numid 有的情况
	genThemePromUrl: args => http.get(`${host}/pdd/genThemePromUrl`, args),
	
	

	 
}

export default api
