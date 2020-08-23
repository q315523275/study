import { message } from 'antd'
import router from 'umi/router'
import { 
  getAdd, 
  getModulesList,
  getItemsList,
  getUniversity,
  getSubject,
  getUniversitySubject,
  getUniversityCase,
  getSummerProject,
  getBackground
 } from '../api'

export default {
  namespace: 'informationPublishAdd',
  state: {
    modulesList: [],
    itemsList: [],
    resourceList: [],
    chooseType:'',

    listData:[],
    pagination:{}

  },
  effects: {
    * getModulesList({ params }, { call, put }) {
      const modulesList = yield call(getModulesList, params)
      yield put({
        type: 'save',
        payload: {
          modulesList,
        },
      })
    },

    * getItemsList({ params,chooseType }, { call, put }) {
      const itemsList = yield call(getItemsList, params)
      yield put({
        type: 'save',
        payload: {
          itemsList,
          resourceList: [],
          chooseType
        },
      })
    },

    // 获取记录数据
    * getResource({ params }, { call, put,select }) {
      const {chooseType} = yield select(({ informationPublishAdd }) => ({ ...informationPublishAdd }))
      console.log(chooseType)
      const waysJson = {
        university: ()=>  call(getUniversity, params),
        subject: ()=> call(getSubject, params),
        universitySubject: ()=> call(getUniversitySubject, params),
        universityCase: ()=> call(getUniversityCase, params),
        summerProject:  ()=> call(getSummerProject, params),
        background: ()=> call(getBackground, params),
      }
      const res = yield waysJson[chooseType]()
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
    // 新增
    * getAdd({ params }, { call, put }) {
      const res = yield call(getAdd, params)
      console.log(res)
      if (res.success) {
        message.success('操作成功')
        router.push('/message-manage/information-publish')
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
