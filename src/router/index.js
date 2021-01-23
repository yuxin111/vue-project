import VueRouter from 'vue-router'
import Layout from '@/components/layout/Index'
import Login from '@/views/login/Index'
import Welcome from './modules/welcome'
import Article from './modules/article'

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
      ...Article
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
