import { message } from 'antd'
import router from 'umi/router'
import { editSubject,getDetail } from '../api'

export default {
  namespace: 'schoolDomainEdit',
  state: {
    initData:null
  },
  effects: {
      //获取初始值
      * getDetail({ params }, { call, put }) {
        const initData = yield call(getDetail, params)
        console.log(initData)
        yield put({
          type: 'save',
          payload: {
            initData,
          },
        })
      },
    // 编辑
    * getEdit({ params }, { call, put }) {
      const {success} = yield call(editSubject, [params])
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
          initData:null
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
