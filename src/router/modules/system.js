import System from '@/views/system/Index'
import SystemUser from '@/views/system/user/Index'
import SystemRole from '@/views/system/role/Index'
import SystemMenu from '@/views/system/menu/Index'

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
          icon: 'el-icon-user-solid'
          // permission: 'system:user:list'
        }
      },
      {
        path: '/system/role',
        component: SystemRole,
        meta: {
          title: '角色管理',
          icon: 'el-icon-help'
          // permission: 'system:role:list'
        }
      },
      {
        path: '/system/menu',
        component: SystemMenu,
        meta: {
          title: '菜单管理',
          icon: 'el-icon-menu'
          // permission: 'system:menu:list'
        }
      }
    ]
  }
]
