/**
 * @author YuXin
 * @desc 日志相关api
 */
import axios from '@/utils/request'

const log = {

  /* 用户 */
  getOperLogList (pagination, params) {
    return axios.post('/operLog/list', params, {
      params: pagination
    })
  }
  // getUserById (id) {
  //   return axios.get(`/user/get/${id}`)
  // },
  // addUser (params) {
  //   return axios.post('/user/add', params)
  // },
  // updateUser (params) {
  //   return axios.post('/user/update', params)
  // },
  // deleteUser (id) {
  //   return axios.get(`/user/delete/${id}`)
  // }
}

export default log
