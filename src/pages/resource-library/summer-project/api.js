import Https from '@/utils/https'

// 获取年级字典项
const getGradeList = params => Https.get('/api/common/dic/grade', params)

//获取状态列表
const getStatusList = params => Https.get('/api/admin/summerProject/status', params)

//获取暑期项目列表
const getListData = params => Https.get('/api/admin/summerProject', params)

// 获取专业库列表
const getSubjectList = params => Https.get('/api/admin/subject?pageNumber=1&pageSize=1000000', params)

// 删除
const getDel = params => Https.delete('/api/admin/summerProject', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/summerProject', params, true)

// 编辑
const getEdit = params => Https.put(`/api/admin/summerProject/${params.id}`, params, true)

// 查详情
const getDetail = params => Https.get( `/api/admin/summerProject/${params.id}`, params)

export {
  getListData, getAdd, getEdit, getDetail, getDel, getGradeList,getSubjectList
}
