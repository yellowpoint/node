//一些公共的业务逻辑方法
//Object.freeze，它做的事情是阻止这个对象在未来被修改。
import sha1 from './sha1'
import store from '@/store/index'

let commonLogic = Object.freeze({
	//获取请求头，用户登录信息
	getAjaxHeaders() {
		//默认的请求头信息 
		let headers = {
			//所有接口的鉴权需要加上版本号区别于老项目
			'x-version': '2.1',
			'x-system': 'tbk',
			'channelType': 'HTML5',
			'tbk-version': '3.0' //版本号
		}
		//若参数不全 里面报错的话就设为空
		try {
			let timestamp = new Date().getTime().toString()
			let userInfo = store.getters.userInfo
			if (!userInfo) {
				return headers
			}
			let sign = sha1.hex_sha1(timestamp + userInfo.userToken + userInfo.secret)
			// 请求头加上登录相关信息
			Object.assign(headers, {
				'x-sign': sign,
				'x-user-token': userInfo.userToken,
				'x-timestamp': timestamp
			})

		} catch (e) {
			console.log(e)

		}

		return headers

	},
	verifyLogin() {
		if (!store.getters.userInfo) {
			let wUrl=encodeURIComponent(`${window.location.href}`)
			uni.navigateTo({
				url: `/pages/public/login?url=${wUrl}`
			});
			return false
		}
		return true
	},
	// 由于uni对location.href限制，故做如下处理
	href(url) {
		// 没有链接的话就返回上一页，再刷新
		if (!url) {
			uni.navigateBack();
			setTimeout(() => {
				location.reload()
			}, 10)
			return
		}

		/*
		 * 同源tabBar页面未刷新的跳转；由于未刷新后面的reload还是会执行;处理后刷新跳转，且加了一个历史记录，需要返回两下；
		 * 同源非tabBar页面不跳转；处理后刷新跳转
		 * 非同源所有页面正常刷新跳转
		 * 
		 * 最好还是要刷新跳转，防止store里的登录信息没有更新到页面
		 * 理论上应该都是同源的链接
		 * */
		// 由于uni对与同源的非tabbar的链接不跳转，故通过pushState设置后再reload
		location.href = url;
		// 新URL必须与当前URL同源，否则 pushState() 会抛出一个异常。
		history.pushState({}, "", url);
		location.reload()
	},
	randomWX(data){
		// 微信号随机从接口数组中取,兼容传过来还是string
		let wxCodeArr = data.toString().split(',')
		return wxCodeArr[Math.floor(Math.random() * wxCodeArr.length)];
	}


})

export default commonLogic
