import { message } from 'antd'
import router from 'umi/router'
import { addSubject,subjectCanAdd } from '../api'

export default {
  namespace: 'schoolDomainAdd',
  state: {
    subjectList:[],
    pagination: { // Table分页配置项
      current: 1,
      pageSize: 10,
      total: null,
    },
  },
  effects: {
    //获取数据表
    * getSubjectCanAdd({ params }, { call, put }) {
      const {data,total,pageNumber} = yield call(subjectCanAdd, params)
      yield put({
        type: 'save',
        payload: {
          subjectList:data,
          pagination: { // Table分页配置项
            current: pageNumber,
            pageSize: 10,
            total,
          },
        },
      })
    },
    // 新增
    * getAdd({ params }, { call, put }) {
      const {success} = yield call(addSubject, params)
      if (success) {
      message.success('操作成功')
      router.push('/resource-library/school-domain')
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
