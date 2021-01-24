import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import keymaster from '@/plugin/keymaster'
import _ from 'lodash'

// 全局css
import '@/style/reset.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$keymaster = keymaster
Vue.prototype._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
