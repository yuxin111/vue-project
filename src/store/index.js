import Vuex from 'vuex'
import Article from './modules/article'
import Main from './modules/main'

export default new Vuex.Store({
  modules: {
    Article,
    Main
  }
})
