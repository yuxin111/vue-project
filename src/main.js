import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'

// element-ui相关
// import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 全局css
import '@/css/reset.css'
// Vue.use(ELEMENT)

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
