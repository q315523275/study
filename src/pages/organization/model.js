import { message } from 'antd'
import { sha256 } from 'js-sha256'
import {
  getTreeNodeDataReq, deleteNodeReq, addNodeReq, freezeUserReq, queryAccountListReq, queryChildUserInfoReq, registerAccountReq, updateAccountInfoReq, updateNodeReq,
} from './api'

export default {
  namespace: 'organization',
  state: {
    treeData: '', // 树结构数据
    memberListData: [], // 人员列表数据
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
      // const res = yield call(getTreeNodeDataReq, params)
      // let isHasDefaultDepartment = false

      // res && res.list.forEach(({ name }) => { name === '默认部门' && (isHasDefaultDepartment = !isHasDefaultDepartment) })

      // !isHasDefaultDepartment && (yield put({ type: 'organization/operateTreeNode', params: { id: 0, name: '默认部门', type: 1 } }))

      yield put({
        type: 'save',
        payload: {
          treeData: [],
        },
      })
    },
    * getAccountList({ params }, { call, put }) { // 获取子账号列表
      // const {
      //   userName, contacts, state, deptId,
      // } = params
      // const res = yield call(queryAccountListReq, params)
      // const {
      //   list, total, pageNum, pageSize,
      // } = res
      // yield put({
      //   type: 'save',
      //   payload: {
      //     memberListData: list,
      //     pagination: {
      //       current: pageNum,
      //       pageSize,
      //       total,
      //       showTotal: sum => `共 ${sum} 项`,
      //     },
      //     query: {
      //       userName, contacts, state, deptId,
      //     },
      //   },
      // })
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
