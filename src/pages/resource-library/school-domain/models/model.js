import { message } from 'antd'
import {
  getTreeNodeDataReq, queryUniversitySubject, deleteSubject, pinnedTop, unpinnedTop,
} from '../api'

export default {
  namespace: 'schoolDomain',
  state: {
    treeData: [], // 树结构数据
    universitySubjectList: [], // 人员列表数据
    pagination: { // Table分页配置项
      current: 1,
      pageSize: 10,
      total: null,
      showTotal: null,
    },
    query: {}, // 查询条件
    universityId: null,
  },
  effects: {
    * getTreeNodeData({ params }, { call, put }) { // 获取树结构数据
      const res = yield call(getTreeNodeDataReq, params)
      yield put({
        type: 'save',
        payload: {
          treeData: res,
        },
      })
    },
    * getUniversitySubjectList({ params }, { call, put }) { // 获取子账号列表
      const {
        universityId,
      } = params
      const res = yield call(queryUniversitySubject, params)
      const {
        data, total, pageNumber, pageSize,
      } = res
      yield put({
        type: 'save',
        payload: {
          universitySubjectList: data,
          pagination: {
            current: pageNumber,
            pageSize,
            total,
            showTotal: sum => `共 ${sum} 项`,
          },
          query: {
            universityId,
          },
        },
      })
    },
    // 删除
    * deleteSubject({ params, cb }, { call, put }) {
      const { success } = yield call(deleteSubject, params)
      if (success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },
    * pinned({ params, cb }, { call, put }) {
      console.log(params)
      const res = yield call(pinnedTop, params)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },
    * unpinned({ params, cb }, { call, put }) {
      console.log(params)
      const res = yield call(unpinnedTop, params)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },
    * clearAll(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          treeData: [], // 树结构数据
          universitySubjectList: [], // 人员列表数据
          pagination: { // Table分页配置项
            current: 1,
            pageSize: 10,
            total: null,
            showTotal: null,
          },
          query: {}, // 查询条件
          universityId: '',
        },
      })
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
