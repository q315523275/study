import { logoutReq } from '../api/global'
import Tools from '@/utils/tools'

export default {
  namespace: 'global',
  state: {
    collapsed: false,
    list: [],
  },
  // subscriptions: {
  //   redirect({ history }) {
  //     if (history.location.pathname === '/') {
  //       history.push('/home')
  //     }
  //   },
  // },
  effects: {
    * getLogout() {
      const data = yield logoutReq()
      if (data) {
        Tools.loginOut()
      }
    },
  },
  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      }
    },
  },
}
