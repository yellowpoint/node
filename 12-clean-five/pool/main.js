// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import './components/toast';
import './components/setPopup';
import './components/regPopup';
import './components/msgPopup';
import './components/agreementPopup';
import '@/assets/styles/common.less';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-tel-input/dist/vue-tel-input.css';
import textTitle from 'components/textTitle/textTitle';
import switchBtn from 'components/switchBtn/switchBtn';

import { MessageBox, Select, Pagination, Table, TableColumn, Dropdown, Option, DropdownMenu, DropdownItem, DatePicker, Tooltip, Collapse, CollapseItem, Loading, Carousel, CarouselItem, Popover, Button} from 'element-ui';

let components = [Select, Pagination, Table, TableColumn, Option, Dropdown, DropdownMenu, DropdownItem, DatePicker, Tooltip, Collapse, CollapseItem, textTitle, switchBtn, Carousel, CarouselItem, Popover, Button];

components.forEach(component => {
    Vue.component(component.name, component);
});
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Loading.directive);

import i18n from "./i18n";
window.i18n = i18n

//公共方法，调用方法，this.$common.xxx
import common from '@/utils/common'
Vue.prototype.$common = common;

import commonLogic from '@/utils/commonLogic'
Vue.prototype.$commonLogic = commonLogic;

import api from '@/api/api'
Vue.prototype.$api = api;

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//添加全局自定义过滤器
import vueFilter from '@/utils/filter'
for(let key in vueFilter) {
	Vue.filter(key, vueFilter[key])
}

import VScroll from '@/components/VScroll'
Vue.component('VScroll', VScroll)

Vue.config.productionTip = false
// Vue.config.keyCodes.capsLk = 20

//弹窗小动画
import 'vue2-animate/dist/vue2-animate.min.css'

//转场动画
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
Vue.use(vueg, router) //←注意这一句应该在router实例化之后

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})

try {
	//百度统计
	let _hmt = _hmt || [];
	window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
	//关闭了自动PV跟踪
	window._hmt.push(['_setAutoPageview', false]);
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?ea93a4e31d310e1ea95de9f5e431ba4b";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();

} catch(e) {
	console.log('百度统计', e)
}

router.afterEach((to, from) => {
  // console.log('afterEach')
  // 路由全局后置钩子后触发清除页面loading层，而不是在app的mounted之后，因为此时router-view还未解析完成
  // loading层用于第一次进页面时，防止头部底部先加载，核心内容再加载导致的页面抖动
  // loading层并没有用于每次路由切换
  if(document.getElementById('appLoading')){
    setTimeout(()=>{
      document.body.removeChild(document.getElementById('appLoading'))
    },100)
  }
 
  
	try {
		/* 路由发生变化修改页面title */
		// if(to.meta.title) {
		// 	document.title = to.meta.title
		// }
		//关闭了自动PV跟踪
		window._hmt.push(['_setAutoPageview', false]);
		//	百度统计默认截断#号后面的参数，故通过手动来添加pv
		window._hmt.push(['_trackPageview',  '/'+ location.search +'#' + to.fullPath]);
	} catch(e) {
		console.log('百度统计', e)
	}

})

//fundebug的错误上报 用的是tqhw@51app.cn的账号，综合项目
import fundebug from "fundebug-javascript";
fundebug.apikey = "5faf9700471ce437b632d599f522a3df2420d68ad326264f4e691be21b452cde";
fundebug.silentVideo = false;
//过滤掉这两个蛋疼的报错
fundebug.filters = [{
		message: /(getElementById\('imgUrl'\))|(getElementById\('desc'\))/	
	},
	{
		name: /^unhandledrejection$/,
	}
]

function formatComponentName(vm) {
	if(vm.$root === vm) return 'root';

	var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
	return(name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function(err, vm, info) {
	var componentName = formatComponentName(vm);
	var propsData = vm.$options && vm.$options.propsData;

	fundebug.notifyError(err, {
		metaData: {
			componentName: componentName,
			propsData: propsData,
			info: info
		}
	});
};