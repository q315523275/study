import { message } from 'antd'
import router from 'umi/router'
import { getDetail, getEdit } from '../api'

export default {
  namespace: 'schoolLibraryEdit',
  state: {
    initData: null,
  },
  effects: {
    // 查详情
    * getDetail({ params }, { call, put }) {
      // const initData = yield call(getDetail, params)
      const initData = {
        name1: '1', name2: '1', name3: '1', name4: '1', name5: '1', name6: '1', name7: '1', name8: '1', name9: '1', name10: '1', name11: '1',
      }
      yield put({
        type: 'save',
        payload: {
          initData,
        },
      })
    },
    // 更新
    * getEdit({ params }, { call, put }) {
      // const res = yield call(getEdit, params)
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
