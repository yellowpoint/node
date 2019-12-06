import Vue from 'vue'
import Router from 'vue-router'
import $common from '../utils/common'

Vue.use(Router)

const pipe = x => () =>
	import(`@/pages/${x}`);

const router = new Router({
	//路由切换，页面滚动到顶部
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	},
	routes: [{
			//重定向到首页index
			path: '/',
			redirect:'/index'
		},
		{
			path: '/index',
			name: 'index',
			meta: {
				title: '首页',
			},
			component: pipe('index')
		},
		{
			path: '/funds',
			name: 'funds',
			meta: {
				title: '我的首页',
			},
			component: pipe('funds/funds')
		},
		{
			path: '/dataStatistics',
			name: 'dataStatistics',
			meta: {
				title: '数据统计',
			},
			component: pipe('dataStatistics/dataStatistics')
		},
		{
			path: '/resource',
			name: 'resource',
			meta: {
				title: '资源中心',
			},
			component: pipe('resource/resource')
		},
		{
			path: '/help',
			name: 'help',
			meta: {
				title: '帮助',
			},
			component: pipe('help/help')
		},
		{
			path: '/set',
			name: 'set',
			meta: {
				title: '设置',
			},
			component: pipe('set/set')
		},
		{
			path: '/messages',
			name: 'messages',
			meta: {
				title: '消息',
			},
			component: pipe('messages/messages')
		},
		{
			path: '/millManage',
			name: 'millManage',
			meta: {
				title: '矿机管理',
			},
			component: pipe('millManage/millManage')
		},
		{
			path: '/affiche',
			name: 'affiche',
			meta: {
				title: '公告',
			},
			component: pipe('affiche/affiche')
		},
		{
			path: '/lease',
			name: 'lease',
			meta: {
				title: '租赁',
			},
			component: pipe('lease/lease')
		},
		{
			path: '/course',
			name: 'course',
			meta: {
				title: '教程',
			},
			component: pipe('course/course')
		},
		{
			path: '/bindingQuery',
			name: 'bindingQuery',
			meta: {
				title: '绑定查询',
			},
			component: pipe('bindingQuery/bindingQuery')
		},
		{
			path: '/dataQuery',
			name: 'dataQuery',
			meta: {
				title: '数据查询',
			},
			component: pipe('dataQuery/dataQuery')
		},
		{
			path: '/orderManage',
			name: 'orderManage',
			meta: {
				title: '订单管理',
			},
			component: pipe('orderManage/newOrderManage')
		},
		{
			path: '/observerPage/:key',
			name: 'observerPage',
			meta: {
				title: '观察者模式',
			},
			component: pipe('observerPage/observerPage')
		},
		{
			path: '/deposit',
			name: 'deposit',
			meta: {
				title: '随心存',
			},
			component: pipe('anytimeStorage/anytimeStorage')
		},
		{
			path: '/borrowingTreasure',
			name: 'borrowingTreasure',
			meta: {
				title: '随心存',
			},
			component: pipe('borrowingTreasure/borrowingTreasure')
		},
		{
			path: '/borrowPrecious',
			name: 'borrowPrecious',
			meta: {
				title: '借币宝',
			},
			component: pipe('borrowPrecious/borrowPrecious')
		},
		{
			path: '/lhdAd',
			name: 'lhdAd',
			meta: {
				title: 'LHD',
				noHeader:true,
				noFooter:true
			},
			component: pipe('other/lhdAd')
		},
		{
			path: '*',
			component: pipe('other/notFound')
		}
	],
})
router.beforeEach((to, from, next) => { // 菜单权限控制
	if(!$common.getCookie('userInfo')) {
		if(to.path === "/millManage" || to.path === "/set" || to.path === "/messages" || to.path === "/funds" ||  to.path === "/bindingQuery" || to.path === '/orderManage' || to.path === '/dataQuery') {
			next({ path: '/index' });
		}else{
			next();
		}
	}else{
		next();
	}
})

export default router