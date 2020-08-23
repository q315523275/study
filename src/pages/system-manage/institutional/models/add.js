import { message } from 'antd'
import router from 'umi/router'
import { getAdd } from '../api'

export default {
  namespace: 'schoolLibraryAdd',
  state: {

  },
  effects: {
    // 新增
    * getAdd({ params }, { call, put }) {
      // const res = yield call(getAdd, params)
      // if (res.flag) {
      // message.success(res.statusDescription)
      message.success('成功')
      router.push('/school-library')
      // } else {
      //   message.error(res.statusDescription)
      // }
    },


  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
