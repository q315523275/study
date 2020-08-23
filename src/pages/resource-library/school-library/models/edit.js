import { message } from 'antd'
import router from 'umi/router'
import { getCountryList, getDetail, getEdit } from '../api'

export default {
  namespace: 'schoolLibraryEdit',
  state: {
    initData: null,
    countryList: [],
  },
  effects: {
    * getCountryList({ params }, { call, put }) {
      const countryList = yield call(getCountryList, params)
      yield put({
        type: 'save',
        payload: {
          countryList,
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
        router.push('/resource-library/school-library')
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
