import Article from '@/views/article/Index'

export default [
  {
    path: '/article_parent',
    component: Article,
    meta: {
      title: '文章_parent',
      icon: 'el-icon-platform-eleme'
    },
    children: [
      {
        path: '/article',
        component: Article,
        meta: {
          title: '文章1',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/article1',
        component: Article,
        meta: {
          title: '文章2',
          icon: 'el-icon-user'
        }
      }
    ]
  }
]
