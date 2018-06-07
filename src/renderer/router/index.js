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
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/page/login').default
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   next()
//   if (!localStorage.getItem('username')) {
//     next()
//   } else {
//     // next('/login')
//     next({path: '/login'})
//   }
// })
export default router
