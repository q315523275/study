import { message } from 'antd'
import router from 'umi/router'
import { getSubjectList, getDetail, getEdit } from '../api'

export default {
  namespace: 'domainLibraryEdit',
  state: {
    initData: null,
    subjectList: [],
  },
  effects: {
    * getSubjectList({ params }, { call, put }) {
      const subjectList = yield call(getSubjectList, params)
      yield put({
        type: 'save',
        payload: {
          subjectList,
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
