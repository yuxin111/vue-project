import cookie from 'js-cookie'
import constant from '@/utils/constant'
const userInfo = (state) => state.userInfo
const isLogin = (state) => JSON.stringify(state.userInfo) !== '{}' || !!cookie.get(constant.COOKIE_USERINFO)
export default {
  userInfo,
  isLogin
}
