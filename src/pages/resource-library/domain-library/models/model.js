import { message } from 'antd'
import {
  getListData, getDel, pinnedTop, unpinnedTop,
} from '../api'

export default {
  namespace: 'domainLibraryT',
  state: {
    listData: [], // 数据
    query: {},
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      const res = yield call(getListData, params)
      const {
        data, total, pageNumber, pageSize,
      } = res
      delete params.pageNumber
      delete params.pageSize
      yield put({
        type: 'save',
        payload: {
          listData: data || [],
          pagination: {
            current: pageNumber,
            pageSize,
            total,
            showTotal: sum => `共 ${sum} 项`,
          },
          query: {
            ...params,
          },
        },
      })
    },

    // 删除
    * getDel({ params, cb }, { call, put }) {
      const { success } = yield call(getDel, params)
      if (success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },

    * pinned({ params, cb }, { call, put }) {
      console.log(params)
      const res = yield call(pinnedTop, params)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },
    * unpinned({ params, cb }, { call, put }) {
      console.log(params)
      const res = yield call(unpinnedTop, params)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
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
