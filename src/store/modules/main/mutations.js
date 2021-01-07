/**
 * 改变侧边栏collapse状态
 */
const COLLAPSE_TOGGLE = (state, count = null) => {
  state.isCollapse = count == null ? !state.isCollapse : count
}

export default {
  COLLAPSE_TOGGLE
}
