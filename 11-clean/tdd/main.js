import Vue from 'vue'
import store from './store'
import App from './App'
import VConsole from 'vconsole'


 // new VConsole()

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
import api from "@/common/api"

Vue.prototype.$api = api;

// 全局的toast提示
Vue.prototype.$toast = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

import '@/common/directive'

//添加全局自定义过滤器
import vueFilter from '@/common/filter'
for (let key in vueFilter) {
	Vue.filter(key, vueFilter[key])
}

//公共方法，调用方法，this.$common.xxx
import common from '@/common/common'
Vue.prototype.$common = common;

import commonLogic from '@/common/commonLogic'
Vue.prototype.$commonLogic = commonLogic;

//局部滚动组件
import VScroll from "@/components/VScroll";
Vue.component("VScroll", VScroll);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// #ifdef H5
//轮播组件；由于uni自带的轮播组件与better-scroll有冲突，会在滑动时触发点击事件，故下载这个
import {
	swiper,
	swiperSlide
} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.component("swiperVue", swiper);
Vue.component("swiperVueSlide", swiperSlide);
// #endif


//商品展示组件
import VGoods from "@/components/VGoods"
Vue.component("VGoods", VGoods);

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
