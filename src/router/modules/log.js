import Log from '@/views/log/Index'
import OperLog from '@/views/log/operLog/Index'

export default [
  {
    path: '/log',
    component: Log,
    meta: {
      title: '日志配置',
      icon: 'el-icon-notebook-2'
    },
    children: [
      {
        path: '/log/operLog',
        component: OperLog,
        meta: {
          title: '操作日志',
          icon: 'el-icon-s-tools',
          permission: 'log:operLog:list'
        }
      }
    ]
  }
]
