/**
 * @author YuXin
 * @desc 系统相关模块
 */
import axios from '@/utils/request'

const system = {
  login (params) {
    return axios.post('/shiro/login', params)
  },
  /* 用户 */
  getUserList (pagination, params) {
    return axios.post('/user/list', params, {
      params: pagination
    })
  },
  addUser (params) {
    return axios.post('/user/add', params)
  },
  updateUser (params) {
    return axios.post('/user/update', params)
  },
  deleteUser (id) {
    return axios.get(`/user/delete/${id}`)
  },
  /* 角色 */
  getRoleList (pagination, params) {
    return axios.post('/role/list', params, {
      params: pagination
    })
  }
}

export default system
