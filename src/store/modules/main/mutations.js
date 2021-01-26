import _ from 'lodash'
/**
 * 改变侧边栏collapse状态
 */
const COLLAPSE_TOGGLE = (state, count = null) => {
  state.isCollapse = count == null ? !state.isCollapse : count
}

/**
 * 往tagList中新增一个tag
 * @example { name: 详情页面, url: /detail(路由、唯一键) }
 */
const TAG_PUSH = (state, tag) => {
  const tagList = state.tagList
  if (!_.some(tagList, tag)) {
    tagList.push(tag)
  }
}

export default {
  COLLAPSE_TOGGLE,
  TAG_PUSH
}
