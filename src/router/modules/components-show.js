import ComponentsShow from '@/views/components-show/Index'
import MultiSelect from '@/views/components-show/multiselect/Index'
import MouseMoveAside from '@/views/components-show/mouse-move-aside/Index'
import Dial from '@/views/components-show/dial/Index'

export default [
  {
    path: '/components-show',
    component: ComponentsShow,
    meta: {
      title: '组件演示',
      icon: 'el-icon-money',
      bgColor: 'ccc',
      'no-padding': true
    }
  }, {
    path: '/components-show/multiselect',
    component: MultiSelect,
    meta: {
      title: '多任务选择组件',
      show: false
    }
  }, {
    path: '/components-show/mouse-move-aside',
    component: MouseMoveAside,
    meta: {
      title: '鼠标移动触发侧边栏',
      show: false
    }
  }, {
    path: '/components-show/dial',
    component: Dial,
    meta: {
      title: '拨号盘',
      show: false
    }
  }
]
