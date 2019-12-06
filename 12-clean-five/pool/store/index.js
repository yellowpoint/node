import Vue from 'vue';
import Vuex from 'vuex';
// import router from '@/router'
import $common from '@/utils/common'

Vue.use(Vuex);

//初始化channel渠道参数
const initChannel = function() {
	let channel = $common.getUrlParam('channel') || $common.getCookie('channel') || 'tq'
	$common.setCookie('channel', channel, 30)
	return channel
}

const initUserInfo = function() {
	let userInfo = $common.getCookie('userInfo');
	userInfo = JSON.parse(userInfo)
	return userInfo
}
const initUserBorrowInfo = function() {
	let userBorrowInfo = $common.getCookie('userBorrowInfo');
	userBorrowInfo = JSON.parse(userBorrowInfo)
	return userBorrowInfo || {};
}
//语言
const initLangKey = function() {
	let langKey = $common.getCookie('langKey') || 'zh';

	return langKey
}

// 币种
const initMineType = function() {
	let mineType = $common.getCookie('mineType') || 1;
	return mineType
}

const store = new Vuex.Store({
	state: {
		channel: initChannel(),
		userInfo: initUserInfo(),
		langKey: initLangKey(),
		msgCount: 0,
		mineType: initMineType(),
		userBorrowInfo: initUserBorrowInfo(),
	},
	getters: {
		channel(state) {
			return state.channel
		},
		userInfo(state) {
			return state.userInfo
		},
		langKey(state) {
			return state.langKey
		},
		msgCount(state) {
			return state.msgCount
		},
		mineType(state) {
			return state.mineType
		},
		userBorrowInfo(state) {
			return state.userBorrowInfo
		},
	},
	mutations: {
		SET_CHANNEL(state, channel) {
			state.channel = channel
		},
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo
		},
		SET_LANGKEY(state, langKey) {
			state.langKey = langKey
		},
		SET_MSGCOUNT(state, msgCount) {
			state.msgCount = msgCount
		},
		SET_MINETYPE(state, mineType) {
			state.mineType = mineType
		},
		USE_RBORROW_INFO(state, userBorrowInfo) {
			state.userBorrowInfo = userBorrowInfo
		}
	},
	actions: {
		setChannel(context, channel) {
			if(!channel) {
				return
			}

			return new Promise((reslove) => {
				context.commit("SET_CHANNEL", channel);
				$common.setCookie('channel', channel, 30)
				reslove(channel)
			})
		},
		setUserInfo(context, userInfo) {

			if(userInfo == -1 || !userInfo) {
				context.commit("SET_USERINFO", null)
				$common.deleteCookie('userInfo')
			} else {
				context.commit("SET_USERINFO", userInfo)
				$common.setCookie('userInfo', JSON.stringify(userInfo), 30)
			}
			//设置用户信息后需要重置下ajax请求头的信息
			import('@/utils/http').then(res => {
				res.resetHeaders()
			})
		},
		setLangKey(context, langKey) {

			if(langKey == -1 || !langKey) {
				return
			}
			i18n.locale = langKey
			context.commit("SET_LANGKEY", langKey)
			$common.setCookie('langKey', langKey, 30)

		},
		setMsgCount(context, msgCount) {
			context.commit("SET_MSGCOUNT", msgCount)
		},
		setMineType(context, mineType) {
			context.commit("SET_MINETYPE", mineType)
			$common.setCookie('mineType', mineType, 30)
		},
		setUserBorrowInfo(context, userBorrowInfo) {
			context.commit("USE_RBORROW_INFO", userBorrowInfo)
			$common.setCookie('userBorrowInfo', JSON.stringify(userBorrowInfo), 30)
		},
	}
})

export default store