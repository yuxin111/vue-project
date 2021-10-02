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
  },
  addArticle (params) {
    return axios.post('/article/add', params)
  },
  updateArticle (params) {
    return axios.post('/article/update', params)
  },
  deleteArticle (id) {
    return axios.get(`/article/delete/${id}`)
  },
  getArticleById (id) {
    return axios.get(`/article/get/${id}`)
  }
}

export default article
