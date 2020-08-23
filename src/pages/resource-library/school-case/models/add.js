import { message } from 'antd'
import router from 'umi/router'
import { addCase ,getAllSubject,getAllDegree} from '../api'

export default {
  namespace: 'schoolCaseAdd',
  state: {
    subjectList:[],
    degreeList:[]
  },
  effects: {
    //下拉数据
    * getSelectData({ params }, { call, put }) {
      const subjectList= yield call(getAllSubject, params)
      const degreeList= yield call(getAllDegree, params)
      yield put({
        type: 'save',
        payload: {
          subjectList,
          degreeList
        },
      })
    },
    // 新增
    * getAdd({ params }, { call, put }) {
      const {success} = yield call(addCase, params)
      if (success) {
      message.success('操作成功')
      router.push('/resource-library/school-Case')
      } else {
        message.error('操作失败')
      }
    },
      *clearAll(_,{put}){
        yield put({
          type: 'save',
          payload: {
            subjectList:[],
            pagination: { // Table分页配置项
            current: 1,
            pageSize: 10,
            total: null,
            },
          },
        })
      }

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
