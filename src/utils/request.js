/**
 * @author YuXin
 * @desc 封装axios
 */
import axios from 'axios'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-type'] = 'application/json'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT
})

service.interceptors.response.use(
  response => {
    const res = response.data
    // 下载请求
    if (res.type === 'application/octet-stream') {
      return Promise.resolve(response)
    }

    // 错误处理
    if (res.retCode !== 200 && res.code !== 0) {
      Message({
        message: res.message || res.msg || 'Error',
        type: 'error',
        duration: process.env.VUE_APP_REQUEST_DURATION
      })
      return Promise.reject(new Error(res.message || res.msg || 'Error'))
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    Message({
      message: error.message || error.msg,
      type: 'error',
      duration: process.env.VUE_APP_REQUEST_DURATION
    })
    return Promise.reject(error)
  }
)

export default service
