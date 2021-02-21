/**
 * @author YuXin
 * @desc 系统相关模块
 */
import axios from '@/utils/request'

const system = {
  login (params) {
    return axios.post('/shiro/login', params)
  },
  test (params) {
    return axios.post('/shiro/test', params)
  }
}

export default system