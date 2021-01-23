import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import cookies from 'js-cookie'
import keymaster from '@/plugin/keymaster'

// 全局css
import '@/style/reset.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$cookie = cookies
Vue.prototype.$keymaster = keymaster

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
