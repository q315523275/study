import { message } from 'antd'
import {
  getListData, getDel,  getGradeList,
} from '../api'

export default {
  namespace: 'backgroundPromote',
  state: {
    listData: [], // 数据
    gradeList: [],
    query: {},
  },
  effects: {
    * getGradeList({ params }, { call, put }) {
      const gradeList = yield call(getGradeList, params)
      yield put({
        type: 'save',
        payload: {
          gradeList,
        },
      })
    },
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
      const res = yield call(getDel, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },
    // 清空缓存
    * clearAll({ params }, { put }) {
      yield put({
        type: 'save',
        payload: {
          listData: [], // 数据
          gradeList: [],
          gradeListJson: {},
          query: {},
        },
      })
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
