import Vuex from 'vuex'
import Article from './modules/article'
import Main from './modules/main'
import User from './modules/user'

export default new Vuex.Store({
  modules: {
    Article,
    Main,
    User
  }
})
