import { message } from 'antd'
import { getListData, getType, deleteOperation } from '../api'

export default {
  namespace: 'log',
  state: {
    operType: [],
    listData: [{
      id: 1, name1: 1, name2: 1, name3: 1, name4: 1, name5: 1, name6: 1, name7: 1, name8: 1, name9: 1,
    }], // 数据
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      const res = yield call(getListData, params)
      const operType = yield call(getType, params)
      const {
        data, total, pageNum, pageSize,
      } = res
      yield put({
        type: 'save',
        payload: {
          operType,
          listData: data || [],
          pagination: {
            current: pageNum,
            pageSize,
            total,
            showTotal: sum => `共 ${sum} 项`,
          },
        },
      })
    },

    * deleteData({ params, cb }, { call, put }) {
      const res = yield call(deleteOperation, params)
      console.log(res)
      cb && cb()
    //   const {
    //     data, total, pageNum, pageSize,
    //   } = res
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       listData: data || [],
    //       pagination: {
    //         current: pageNum,
    //         pageSize,
    //         total,
    //         showTotal: sum => `共 ${sum} 项`,
    //       },
    //     },
    //   })
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
