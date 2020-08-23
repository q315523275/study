import { message } from 'antd'
import router from 'umi/router'
import { editGroup,getTreeNodeDataReq } from '../api'

export default {
  namespace: 'groupEdit',
  state: {
    treeData:[]
  },
  effects: {
    //获取数据表
    * getTreeNodeDataReq({ params }, { call, put }) {
      const res = yield call(getTreeNodeDataReq, params)
      yield put({
        type: 'save',
        payload: {
          treeData:res,
        },
      })
    },
    // 新增
    * getEdit({ params }, { call, put }) {
      const {success} = yield call(editGroup, params)
      if (success) {
      message.success('操作成功')
      router.push('/forum-manage/group')
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
