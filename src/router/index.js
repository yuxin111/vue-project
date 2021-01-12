// import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/Index'
import Welcome from './modules/welcome'
import Article from './modules/article'

// Vue.use(VueRouter)

const routes = [
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
