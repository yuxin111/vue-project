/**
 * @author YuXin
 * @desc 系统相关模块
 */
import axios from '@/utils/request'

const system = {
  login (params) {
    return axios.post('/shiro/login', params)
  },
  getUserList (pagination, params) {
    return axios.post('/user/list', params, {
      params: pagination
    })
  },
  insertUser (params) {
    return axios.post('/user/insert', params)
  },
  deleteUser (id) {
    return axios.get(`/user/delete/${id}`)
  }
}

export default system
