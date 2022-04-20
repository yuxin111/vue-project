/**
 * @author YuXin
 * @desc 单一输入模块相关api
 */
import axios from '@/utils/request'

const singleInputTable = {
  getSingleInputTableList (pagination, params) {
    return axios.post('/singleInputTable/list', params, {
      params: pagination
    })
  }
}

export default singleInputTable
