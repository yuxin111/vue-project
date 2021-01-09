import Article from '@/views/article/Index'

export default [
  {
    path: '/article_parent',
    component: Article,
    meta: {
      title: '文章',
      icon: 'el-icon-platform-eleme'
    },
    children: [
      {
        path: '/article',
        component: Article,
        meta: {
          title: '文章',
          icon: 'el-icon-user'
        }
      }
    ]
  }
]
