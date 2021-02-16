import System from '@/views/system/Index'
import SystemUser from '@/views/system/user/Index'

export default [
  {
    path: '/system',
    component: System,
    meta: {
      title: '系统配置',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: '/system/user',
        component: SystemUser,
        meta: {
          title: '用户管理',
          icon: 'el-icon-user'
        }
      }
    ]
  }
]
