import { message } from 'antd'
import { getListData ,getUsersList,deleteNote,pinnedNote,getApplyStatus} from '../api'

export default {
  namespace: 'note',
  state: {
    listData: [], // 数据
    applyStatusList:[],
    userList:[]
  },
  effects: {
    // 获取数据
    * getListData({ params }, { call, put }) {
      const {success,data:{data, total, pageNumber, pageSize,}} = yield call(getListData, params)
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          listData: data || [],
          pagination: {
            current: pageNumber,
            pageSize,
            total,
            showTotal: sum => `共 ${sum} 项`,
          },
        },
      })
    },

      //获取选择时间内发布笔记的用户列表
      *getUsersList({ params }, { call, put }){
        const {success,data} = yield call(getUsersList, params)
        yield put({
          type: 'save',
          payload: {
            userList:data
          },
        })
      },

    //审核状态
    *getApplyStatus({ params }, { call, put }){
      const {success,data} = yield call(getApplyStatus, params)
      yield put({
        type: 'save',
        payload: {
          applyStatusList:data
        },
      })
    },
       // 删除数据
       * deleteNote({ params,cb }, { call, put }) {
        const {success} = yield call(deleteNote, params)
        console.log(success)
        if (success) {
          message.success('操作成功')
          cb && cb()
        } else {
          message.error('操作失败')
        }
      },
      // 置顶数据
      * pinnedNote({ params,cb }, { call, put }) {
        const {success} = yield call(pinnedNote, params)
        if (success) {
          message.success('操作成功')
          cb && cb()
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
