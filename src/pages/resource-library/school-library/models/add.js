import { message } from 'antd'
import router from 'umi/router'
import { getAdd, getCountryList } from '../api'

export default {
  namespace: 'schoolLibraryAdd',
  state: {
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
    // 新增
    * getAdd({ params }, { call, put }) {
      const res = yield call(getAdd, params)
      console.log(res)
      if (res.success) {
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
