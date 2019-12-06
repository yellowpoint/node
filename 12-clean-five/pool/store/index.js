import Vue from 'vue';
import Vuex from 'vuex';
// import router from '@/router'
import $common from '@/utils/common';

Vue.use(Vuex);

// 初始化channel渠道参数
const initChannel = function () {
  const channel = $common.getUrlParam('channel') || $common.getCookie('channel') || 'tq';
  $common.setCookie('channel', channel, 30);
  return channel;
};

const initUserInfo = function () {
  let userInfo = $common.getCookie('userInfo');
  userInfo = JSON.parse(userInfo);
  return userInfo;
};
// 语言
const initLangKey = function () {
  const langKey = $common.getCookie('langKey') || 'zh';

  return langKey;
};


const store = new Vuex.Store({
  state: {
    channel: initChannel(),
    userInfo: initUserInfo(),
    langKey: initLangKey(),
    msgCount: 0,
    picsInfo: {},
    mineTypeList: {
      addval: [],
      home: [],
      millmgr: [],
    },
  },
  getters: {
    channel(state) {
      return state.channel;
    },
    userInfo(state) {
      return state.userInfo;
    },
    langKey(state) {
      return state.langKey;
    },
    msgCount(state) {
      return state.msgCount;
    },
    picsInfo(state) {
      return state.picsInfo;
    },
    mineTypeList(state) {
      return state.mineTypeList;
    },
  },
  mutations: {
    SET_CHANNEL(state, channel) {
      state.channel = channel;
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_LANGKEY(state, langKey) {
      state.langKey = langKey;
    },
    SET_MSGCOUNT(state, msgCount) {
      state.msgCount = msgCount;
    },
    SET_PICS_INFO(state, picsInfo) {
      state.picsInfo = picsInfo;
    },
    SET_MINE_TYPE_LIST(state, mineTypeList) {
      state.mineTypeList = mineTypeList;
    },
  },
  actions: {
    setChannel(context, channel) {
      if (!channel) {
        return;
      }

      return new Promise((reslove) => {
        context.commit('SET_CHANNEL', channel);
        $common.setCookie('channel', channel, 30);
        reslove(channel);
      });
    },
    setUserInfo(context, userInfo) {
      if (userInfo == -1 || !userInfo) {
        context.commit('SET_USERINFO', null);
        $common.deleteCookie('userInfo');
      } else {
        context.commit('SET_USERINFO', userInfo);
        $common.setCookie('userInfo', JSON.stringify(userInfo), 30);
      }
      // 设置用户信息后需要重置下ajax请求头的信息
      import('@/utils/http').then(res => {
        res.resetHeaders();
      });
    },
    setLangKey(context, langKey) {
      if (langKey == -1 || !langKey) {
        return;
      }
      window.i18n.locale = langKey;
      context.commit('SET_LANGKEY', langKey);
      $common.setCookie('langKey', langKey, 30);
    },
    setMsgCount(context, msgCount) {
      context.commit('SET_MSGCOUNT', msgCount);
    },
    setPicsInfo(context, picsInfo) {
      context.commit('SET_PICS_INFO', picsInfo);
    },
    setMineTypeList(context, mineTypeList) {
      context.commit('SET_MINE_TYPE_LIST', mineTypeList);
    },
  },
});

export default store;
