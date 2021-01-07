import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  isCollapse: false // 侧边栏是否收缩
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
