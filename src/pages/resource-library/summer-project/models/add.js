import { message } from 'antd'
import router from 'umi/router'
import { getAdd,getGradeList,getSubjectList} from '../api'

export default {
  namespace: 'summerProjectAdd',
  state: {
    gradeList:[],
    subjectList:[]
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
    // 新增
    * getAdd({ params }, { call, put }) {
      const res = yield call(getAdd, params)
      console.log(res)
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
