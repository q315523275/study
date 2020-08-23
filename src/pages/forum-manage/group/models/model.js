import { message } from 'antd'
import {
  getTreeNodeDataReq, deleteNodeReq, addNodeReq, groupEnable,groupDisable, queryGroupListReq, deleteGroup, updateNodeReq,
} from '../api'

export default {
  namespace: 'group',
  state: {
    treeData: [], // 树结构数据
    groupListData: [], // 人员列表数据
    pagination: { // Table分页配置项
      current: 1,
      pageSize: 10,
      total: null,
      showTotal: null,
    },
    query: {}, // 查询条件
  },
  effects: {
    * getTreeNodeData({ params }, { call, put }) { // 获取树结构数据
      const res = yield call(getTreeNodeDataReq, params)
      yield put({
        type: 'save',
        payload: {
          treeData:res,
        },
      })
    },
    * addTreeNodeData({ params,cb }, { call, put,select }) { // 添加
      const {success} = yield call(addNodeReq, params)
      if(success){
        message.success('操作成功')
        cb && cb()
      }else{
        message.error('操作失败')
      }
    },
    * editTreeNodeData({ params,cb }, { call, put }) { // 编辑
      const {success} = yield call(updateNodeReq, params)
      if(success){
        message.success('操作成功')
        cb && cb()
      }else{
        message.error('操作失败')
      }
    },
    * deleteTreeNodeData({ params,cb }, { call, put }) { // 删除
      const {success} = yield call(deleteNodeReq, params)
      if(success){
        message.success('操作成功')
        cb && cb()
      }else{
        message.error('操作失败')
      }
    },
    * getGroupList({ params }, { call, put }) { // 获取子账号列表
      const {
         categoryId,
      } = params
      const res = yield call(queryGroupListReq, params)
      const {
        data, total, pageNumber, pageSize,
      } = res
      yield put({
        type: 'save',
        payload: {
          groupListData: data,
          pagination: {
            current: pageNumber,
            pageSize,
            total,
            showTotal: sum => `共 ${sum} 项`,
          },
          query: {
            categoryId,
          },
        },
      })
    },
    //启用/禁用
    * groupEnableDisable({ params,state }, { call, put }) { 
      console.log(state)
      const {success} =state? yield call(groupEnable, params):yield call(groupDisable, params)
      if(success){
        message.success('操作成功')
      }else{
        message.error('操作失败')
      }
    },
     //删除
     * deleteGroup({ params,cb }, { call, put }) { 
      const {success} = yield call(deleteGroup, params)
      if(success){
        message.success('操作成功')
        cb&&cb()
      }else{
        message.error('操作失败')
      }
    },
    *clearAll(_,{put}){
      yield put({
        type: 'save',
        payload: {
          treeData: [], // 树结构数据
          groupListData: [], // 人员列表数据
          pagination: { // Table分页配置项
            current: 1,
            pageSize: 10,
            total: null,
            showTotal: null,
          },
          query: {}, // 查询条件
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
