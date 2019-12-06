import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    myHome: {},
    borrowAddress: '',

  },
  getters: {
    borrowAddress(state) {
      return state.borrowAddress;
    },
    myHome(state) {
      return state.myHome;
    },

  },
  mutations: {
    borrowAddress(state, data) {
      state.borrowAddress = data;
    },
    myHome(state, data) {
      state.myHome = data;
    },

  },
  actions: {
    borrowAddress(context, channel) {

    },

  },
});

export default store;
