/**
 * @author YuXin
 * @desc 文章模块相关请求
 */
import axios from '@/utils/request'

const article = {
  articleList (params) {
    return axios.post('/article/list', params)
  }
}

export default article
