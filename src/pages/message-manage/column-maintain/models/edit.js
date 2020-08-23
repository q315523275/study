import { message } from 'antd'
import router from 'umi/router'
import {
  getModulesList, getPagesList, getDetail, getEdit,
} from '../api'

export default {
  namespace: 'columnMaintainEdit',
  state: {
    initData: null,
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
    // 查详情
    * getDetail({ params }, { call, put }) {
      const initData = yield call(getDetail, params)
      yield put({
        type: 'save',
        payload: {
          initData,
        },
      })
    },
    // 更新
    * getEdit({ params }, { call, put }) {
      const res = yield call(getEdit, params)
      if (res) {
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
