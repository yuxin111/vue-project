import permission from './permission'
import iconRotate from './icon-rotate'

const install = function (Vue) {
  Vue.directive('permission', permission)
  Vue.directive('iconRotate', iconRotate)
}

if (window.Vue) {
  window.permission = permission
  window.iconRotate = iconRotate
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

export default install
