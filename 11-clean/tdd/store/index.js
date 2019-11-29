import Vue from 'vue'
import Vuex from 'vuex'
import $common from '@/common/common'

Vue.use(Vuex)

const initUserInfo = function() {
	let userInfo = $common.getCookie('userInfo');
	userInfo = userInfo ? JSON.parse(userInfo) : null
	return userInfo
}

const store = new Vuex.Store({
	state: {
		userInfo: initUserInfo(),
		searchObject: null
	},
	getters: {
		userInfo(state) {
			return state.userInfo
		},
		searchObject(state) {
			return state.searchObject
		},
	},
	mutations: {
		userInfo(state, data) {
			state.userInfo = data
		},
		searchObject(state, data) {
			state.searchObject = data
		},
	},
	actions: {
		userInfo(context, data) {
			if (data == -1 || !data) {
				context.commit("userInfo", null)
				$common.deleteCookie('userInfo')
			} else {
				context.commit("userInfo", data)
				$common.setCookie('userInfo', JSON.stringify(data), 30)
			}
			//设置用户信息后需要重置下ajax请求头的信息
			import('@/common/http').then(res => {
				res.default.resetHeaders()
			})
		},
		searchObject(context, data) {
			context.commit("searchObject", data)
		}
	}
})

export default store
