import VueRouter from 'vue-router'
import store from '@/store'
import Layout from '@/components/layout/Index'
import Login from '@/views/login/Index'
import Welcome from './modules/welcome'
import Article from './modules/article'
import System from './modules/system'
import Log from './modules/log'
import ComponentsShow from './modules/components-show'
import LgfExpression from './modules/lgf-expression'
import SingleInputTable from './modules/single-input-table'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      ...Welcome,
      ...System,
      ...Log,
      ...Article,
      ...ComponentsShow,
      ...LgfExpression,
      ...SingleInputTable
    ],
    meta: {
      validate: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.getters['User/isLogin'] // 是否已登录
  const require2Login = to.matched.some(item => item.meta.validate)// 是否需要登录
  if (!isLogin && require2Login) {
    next('/login')
  } else {
    if (require2Login) {
      store.commit('Main/TAG_PUSH', {
        name: to.meta.title || '未知名称',
        url: to.fullPath
      })
    }
    next()
  }
})

export default router
