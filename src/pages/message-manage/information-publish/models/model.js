import { message } from 'antd'
import {
  getListData, getDel, getModulesList, getUnPublish, getPublish,
} from '../api'

export default {
  namespace: 'informationPublish',
  state: {
    listData: [], // 数据
    countryList: [],
    countryListJson: {},
    query: {},
  },
  effects: {
    * getCountryList({ params }, { call, put }) {
      const countryList = yield call(getModulesList, params)
      const countryListJson = {}
      countryList.map((item) => {
        countryListJson[item.countryId] = item
      })
      yield put({
        type: 'save',
        payload: {
          countryList,
          countryListJson,
        },
      })
    },
    // 获取数据
    * getListData({ params }, { call, put }) {
      const res = yield call(getListData, params)
      const {
        data, total, pageNumber, pageSize,
      } = res
      delete params.pageNumber
      delete params.pageSize
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
          query: {
            ...params,
          },
        },
      })
    },

    // 删除
    * getDel({ params, cb }, { call, put }) {
      const res = yield call(getDel, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },

    // 取消发布
    * getUnPublish({ params, cb }, { call, put }) {
      const res = yield call(getUnPublish, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },

    // 取消发布
    * getPublish({ params, cb }, { call, put }) {
      const res = yield call(getPublish, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        cb && cb()
      } else {
        message.error('操作失败')
      }
    },

    // 清空缓存
    * clearAll({ params }, { put }) {
      yield put({
        type: 'save',
        payload: {
          listData: [], // 数据
          countryList: [],
          countryListJson: {},
          query: {},
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
