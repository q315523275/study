import { message } from 'antd'
import router from 'umi/router'
import { getAdd, getListData, getSubjectList } from '../api'

export default {
  namespace: 'domainLibraryAdd',
  state: {
    subjectList: [],
  },
  effects: {
    // 获取学科数据
    * getSubjectList({ params }, { call, put }) {
      const subjectList = yield call(getSubjectList, params)
      yield put({
        type: 'save',
        payload: {
          subjectList,
        },
      })
    },
    // 新增
    * getAdd({ params }, { call, put }) {
      const res = yield call(getAdd, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        router.push('/resource-library/domain-library')
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
