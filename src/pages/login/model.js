import router from 'umi/router'
import { message } from 'antd'
import { queryLogin } from './api'

export default {
  namespace: 'loginSpace',
  state: {},
  effects: {
    * loginMsg({ params }, { call, put }) {
      const res = yield call(queryLogin, params)
      const {
        success, statusDescription, data,
      } = res
      if (success) {
        const { profile: { name }, accessToken } = data
        localStorage.setItem('userName', name)
        localStorage.setItem('token', accessToken)
        router.push('/home')
      } else {
        message.error(statusDescription)
      }
    },
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
