import Article from '@/views/article/Index'

export default [
  {
    path: '/article_parent',
    component: Article,
    meta: {
      title: '文章_parent',
      icon: 'el-icon-folder-opened'
    },
    children: [
      {
        path: '/article1',
        component: Article,
        meta: {
          title: '文章1',
<<<<<<< HEAD
          icon: 'el-icon-folder'
=======
          icon: 'el-icon-user'
>>>>>>> master
        },
        children: [
          {
            path: '/article1_1',
            component: Article,
            meta: {
              title: '文章1_1',
<<<<<<< HEAD
              icon: 'el-icon-document'
=======
              icon: 'el-icon-user'
>>>>>>> master
            }
          }
        ]
      },
      {
        path: '/article2',
        component: Article,
        meta: {
          title: '文章2',
          icon: 'el-icon-document'
        }
      }
    ]
  }
]
