import { message } from 'antd'
import { getListData,getEnclosureList } from '../api'

export default {
  namespace: 'feedback',
  state: {
    listData: [], // 数据
    enclosureList:[]
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      const {success,data:{data,total,pageNumber,pageSize}} = yield call(getListData, params)
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
        },
      })
    },
     // 获取附件列表
     * getEnclosureList({ params }, { call, put }) {
      const {success,data} = yield call(getEnclosureList, params)
      yield put({
        type: 'save',
        payload: {
          enclosureList:data
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
