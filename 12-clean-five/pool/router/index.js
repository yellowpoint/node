import Vue from 'vue';
import Router from 'vue-router';
import $common from '../utils/common';

Vue.use(Router);

const pipe = x => () =>
  import(`@/pages/${x}`);

const router = new Router({
  // 路由切换，页面滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [{
    // 重定向到首页index
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: pipe('index/index'),
  },
  {
    path: '/myHome',
    name: 'myHome',
    meta: {
      title: '我的首页',
    },
    component: pipe('myHome/myHome'),
  },
  {
    path: '/finance',
    name: 'finance',
    meta: {
      title: '增值专区',
    },
    component: pipe('finance/financePage'),
  },
  {
    path: '/set',
    name: 'set',
    meta: {
      title: '设置',
    },
    component: pipe('set/set'),
  },
  {
    path: '/messages',
    name: 'messages',
    meta: {
      title: '消息',
    },
    component: pipe('messages/messages'),
  },
  {
    path: '/millManage',
    name: 'millManage',
    meta: {
      title: '矿机管理',
    },
    component: pipe('millManage/millManagePage'),
  },
  {
    path: '/dataQuery',
    name: 'dataQuery',
    meta: {
      title: '数据查询',
    },
    component: pipe('dataQuery/dataQuery'),
  },
  {
    path: '/observerPage/:key',
    name: 'observerPage',
    meta: {
      title: '观察者模式',
    },
    component: pipe('observerPage/observerPage'),
  },
  {
    path: '/more',
    name: 'more',
    meta: {
      title: '更多',
    },
    component: pipe('more/more'),
  },
  {
    path: '*',
    component: pipe('other/notFound'),
  },
  ],
});
router.beforeEach((to, from, next) => { // 菜单权限控制
  if (!$common.getCookie('userInfo')) {
    if (to.path === '/millManage' || to.path === '/set' || to.path === '/messages' || to.path === '/dataQuery') {
      next({
        path: '/index',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
