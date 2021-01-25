import constant from '@/utils/constant'
import cookie from 'js-cookie'

const login = ({ commit }, userInfo = {}) => {
  return new Promise((resolve, reject) => {
    if (userInfo.username === 'yuxin' && userInfo.password === '12345') {
      commit('USERINFO_SET', userInfo)
      cookie.set(constant.COOKIE_USERINFO, userInfo, { expires: constant.COOKIE_USERINFO_EXPIRE })
      resolve(userInfo)
    } else {
      reject(new Error('账号密码错误'))
    }
  })
}

const logout = ({ commit }) => {
  return new Promise((resolve) => {
    commit('USERINFO_SET')
    cookie.remove(constant.COOKIE_USERINFO)
    resolve('已退出登录')
  })
}

export default {
  login,
  logout
}
