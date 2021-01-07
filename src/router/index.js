import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from '@/components/containers/Index'
import Welcome from '@/views/welcome/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Container',
    component: Container,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
