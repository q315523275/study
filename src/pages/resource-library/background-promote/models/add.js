import { message } from 'antd'
import router from 'umi/router'
import { getAdd, getGradeList,getCategoryList,getGoldList,getSubjectList} from '../api'

export default {
  namespace: 'backgroundPromoteAdd',
  state: {
    gradeList: [],
    categoryList:[],
    goldList:[],
    subjectList:[]
  },
  effects: {
    * getSelectList({ params }, { call, put }) {
      const gradeList = yield call(getGradeList, params)
      const categoryList = yield call(getCategoryList, params)
      const goldList = yield call(getGoldList, params)
      const {data} = yield call(getSubjectList, params)
      yield put({
        type: 'save',
        payload: {
          gradeList,
          categoryList,
          goldList,
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
        router.push('/resource-library/background-promote')
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
