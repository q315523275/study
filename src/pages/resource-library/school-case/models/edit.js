import { message } from 'antd'
import router from 'umi/router'
import { editCase ,getAllSubject,getAllDegree,detailCase} from '../api'

export default {
  namespace: 'schoolCaseEdit',
  state: {
    initData:null,
    subjectList:[],
    degreeList:[]
  },
  effects: {
   //详情
   * getInitData({ params }, { call, put }) {
    const initData= yield call(detailCase, params)
    yield put({
      type: 'save',
      payload: {
        initData
      },
    })
  },
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
    * getEdit({ params }, { call, put }) {
      const {success} = yield call(editCase, params)
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
