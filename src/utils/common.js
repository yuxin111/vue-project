import store from '@/store'

/**
 * 树形结构数据 <- 列表
 * @param list 列表
 * @param id 当前项id名称，与parentId对应
 * @param parentId 父项id名称，与id对应
 * @param children 子列表名称
 * @returns {*}
 */
function formatToTree (list, id = 'id', parentId = 'parentId', children = 'children') {
  return list.filter(parent => {
    const branchArr = list.filter(child => {
      return parent[id] === child[parentId]
    })
    if (branchArr.length !== 0) {
      parent[children] = branchArr
    } else {
      delete parent[children]
    }
    return !parent[parentId]
  })
}

/**
 * 是否拥有权限（菜单）
 * @param menuName 菜单名。
 *        例：'system:user:list'
 * @param menus 权限列表，通常在登录时获取。不传时默认为当前登录用户的权限列表
 *        例：['system:user:list','system:user:add','system:user:edit'...]
 */
function hasPermission (menuName = '', menus = []) {
  if (menus.length === 0) {
    menus = store.getters['User/userInfo'].menus || []
  }
  return menuName ? menus.includes(menuName) : true
}

/**
 * 去除html标签
 * @param htmlText 传入的html字符串
 *        例：<p>你好<highlight>呀！</highlight></p>
 *        结果：你好呀！
 * @param except 除了这个标签外
 *        例：highlight
 *        结果：你好<highlight>呀！</highlight>
 */
function removeHtmlTag (htmlText, exceptTagName) {
  let regex
  if (!exceptTagName) {
    regex = /(<([^>]+)>)/ig
  } else {
    // eslint-disable-next-line no-eval
    regex = eval(`/<(?!${exceptTagName}|\\/${exceptTagName}).*?>/ig`)
  }
  return htmlText.replace(regex, '')
}

/**
 * 防抖：防止重复点击触发事件
 * @param fn 执行的函数
 * @param time 间隔时间
 */
function debounce (fn, time) {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

/**
 * 节流：指定时间间隔内只会执行一次任务
 * @param fn 执行的函数
 * @param time 间隔时间
 */
function throttle (fn, time) {
  const _arguments = arguments
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.call(this, _arguments)
      canRun = true
    }, time)
  }
}

export { formatToTree, hasPermission, removeHtmlTag, debounce, throttle }
