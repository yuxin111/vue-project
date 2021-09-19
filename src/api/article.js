/**
 * @author YuXin
 * @desc 文章模块相关api
 */
import axios from '@/utils/request'

const article = {
  articleList (params) {
    return axios.post('/article/list', params)
  },
  getArticleList (pagination, params) {
    return axios.post('/article/findAll', params, {
      params: pagination
    })
  }
}

export default article
