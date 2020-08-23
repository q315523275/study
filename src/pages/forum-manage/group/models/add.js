import { message } from 'antd'
import router from 'umi/router'
import { addGroup,getTreeNodeDataReq } from '../api'

export default {
  namespace: 'groupAdd',
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
    * getAdd({ params }, { call, put }) {
      const {success} = yield call(addGroup, params)
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
