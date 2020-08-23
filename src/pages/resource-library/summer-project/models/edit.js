import { message } from 'antd'
import router from 'umi/router'
import { getEdit,getGradeList,getDetail,getSubjectList} from '../api'

export default {
  namespace: 'summerProjectEdit',
  state: {
    gradeList:[],
    subjectList:[],
    initData:null
  },
  effects: {
    * getSelectList({ params }, { call, put }) {
      const gradeList = yield call(getGradeList, params)
      const {data} = yield call(getSubjectList, params)
      yield put({
        type: 'save',
        payload: {
          gradeList,
          subjectList:data
        },
      })
    },
    * getDetail({ params }, { call, put }) {
      const initData = yield call(getDetail, params)
      yield put({
        type: 'save',
        payload: {
          initData,
        },
      })
    },
    // 新增
    * getEdit({ params }, { call, put }) {
      const res = yield call(getEdit, params)
      if (res.success) {
        message.success('操作成功')
        router.push('/resource-library/summer-project')
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
