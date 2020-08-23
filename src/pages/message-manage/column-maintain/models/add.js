import { message } from 'antd'
import router from 'umi/router'
import { getAdd, getModulesList, getPagesList } from '../api'

export default {
  namespace: 'columnMaintainAdd',
  state: {
    modulesList: [],
    pagesList: [],
  },
  effects: {
    * getModulesList({ params }, { call, put }) {
      const modulesList = yield call(getModulesList, params)
      yield put({
        type: 'save',
        payload: {
          modulesList,
        },
      })
    },

    * getPagesList({ params }, { call, put }) {
      const pagesList = yield call(getPagesList, params)
      yield put({
        type: 'save',
        payload: {
          pagesList,
        },
      })
    },
    // 新增
    * getAdd({ params }, { call, put }) {
      const res = yield call(getAdd, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        router.push('/message-manage/column-maintain')
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
