/**
 * 通用uni-app网络请求
 *
 */
import $commonLogic from '@/common/commonLogic'
import store from '@/store/index'
//加上pos请求的请求头
let postConfig = {}



let toast = (title = "网络繁忙，请稍后再试~") => {
	uni.showToast({
		title: title,
		duration: 2000,
		icon: 'none'
	});
}

let http = {
	config: {
		baseUrl: '',
		header: {
			// 'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
	
		// uni.showLoading({
		// 	title: '加载中'
		// });
		if (!options) {
			options = {}
		}
		this.resetHeaders()
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = Object.assign({}, this.config.header, postConfig)

		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				const r = response.data;

				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				
				// uni.hideLoading();
				
				if (statusCode === 200) {
					//成功
					if (r.code == 200) {
						resolve(r);
					} else {
						if (['1000', '1001', '1002'].includes(r.code)) {
							uni.showModal({
								title: '提示',
								content: '未登录或登录已过期，请登录!',
								cancelText: '取消',
								confirmText: '去登录',
								success: function(res) {
									//清除登录信息,cookie清除了，但在这里面没有触发store登录状态变化
									store.dispatch('userInfo', null)
									if (res.confirm) {
										let wUrl=encodeURIComponent(`${window.location.href}`)
										uni.navigateTo({
											url: `/pages/public/login?url=${wUrl}`,
										});
									} else if (res.cancel) {
										location.reload()
									}
								}
							});
						}
						toast(r.msg || '哎呀，接口出错了')
						reject(r)
					}

				} else {
					ajaxErr(response)
					//有点纠结当http的状态码不是200的时候是否要把错误抛出去
					//业务上一般是不会处理这种错误的
					//不抛出的话，业务代码里请求后面的就不会执行了,好处是业务上catch的时候就不用区分是http请求的问题还是接口自定义的问题
					// reject(response)
				}
				
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}


			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}

		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	resetHeaders() {
		postConfig = $commonLogic.getAjaxHeaders() || {}

	}
}

function ajaxErr(err) {

	let message = '网络繁忙，请稍后再试~'
	if (err && err.statusCode) {
		switch (err.statusCode) {
			case 400:
				message = "请求错误";
				break;

			case 401:
				message = "未授权，请登录";
				break;

			case 403:
				message = "拒绝访问";
				break;

			case 404:
				message = `请求地址出错`;
				break;
			case 408:
				message = "请求超时";
				break;

			case 500:
				message = "服务器内部错误";
				break;

			case 501:
				message = "服务未实现";
				break;

			case 502:
				message = "网关错误";
				break;

			case 503:
				message = "服务不可用";
				break;

			case 504:
				message = "网关超时";
				break;

			case 505:
				message = "HTTP版本不受支持";
				break;

			default:
		}
	}
	toast(message)
}


export default http
