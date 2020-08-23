import { message } from 'antd'
import { applyNote } from '../api'
import router from 'umi/router'

export default {
  namespace: 'noteCheck',
  state: {
   
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      // const res = yield call(getListData, params)
      // const {
      //   list, total, pageNum, pageSize,
      // } = res
      // yield put({
      //   type: 'save',
      //   payload: {
      //     listData: list || [],
      //     pagination: {
      //       current: pageNum,
      //       pageSize,
      //       total,
      //       showTotal: sum => `共 ${sum} 项`,
      //     },
      //   },
      // })
    },
    *applyNote({ params }, { call, put }){
      const {success,error} = yield call(applyNote, params)
      if(success){
          message.success('操作成功')
          router.push('/discover-manage/note')
      }else{
          message.error(error)
      }
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
