import Vue from 'vue'
import Vuex from 'vuex'
import Article from './modules/article'
import Main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Article,
    Main
  }
})
