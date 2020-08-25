import { message } from 'antd'
import { getDepDataReq } from '../api'

export default {
  namespace: 'institutional',
  state: {
    test: 'aaa',
    treeData: [],
    listData: [{
      id: 1,
      name1: 1,
      name2: 1,
      name3: 1,
      name4: 1,
      name5: 1,
      name6: 1,
      name7: 1,
      name8: 1,
      name9: 1,
    }], // 数据
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      const treeData = yield call(getDepDataReq, params)
      // const {
      //   list, total, pageNum, pageSize,
      // } = res
      // console.log(res)
      yield put({
        type: 'save',
        payload: {
          treeData: [treeData],
          // listData: list || [],
          // pagination: {
          //   current: pageNum,
          //   pageSize,
          //   total,
          //   showTotal: sum => `共 ${sum} 项`,
          // },
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
