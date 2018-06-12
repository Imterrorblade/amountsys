import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/page/billlist'
    },
    {
      path: '/page',
      name: 'page',
      component: require('@/page/container').default,
      children: [{
        path: 'test',
        name: 'test',
        component: require('@/page/test').default
      }, {
        path: 'billlist',
        name: 'billlist',
        component: require('@/page/billlist').default
      }, {
        path: 'userinfo',
        name: 'userinfo',
        component: require('@/page/userinfo').default
      }, {
        path: 'analysis',
        name: 'analysis',
        component: require('@/page/analysis').default
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/page/login').default
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})
export default router
