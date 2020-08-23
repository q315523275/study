import Https from '@/utils/https'

// 获取年级字典项
const getGradeList = params => Https.get('/api/common/dic/grade', params)

//获取背景提升项目分类字典表
const getCategoryList = params => Https.get('/api/common/dic/background_category', params)

// 获取含金量字典表
const getGoldList = params => Https.get('/api/common/dic/gold', params)

// 获取专业库列表
const getSubjectList = params => Https.get('/api/admin/subject?pageNumber=1&pageSize=1000000', params)

// 获取背景提升列表
const getListData = params => Https.get('/api/admin/background', params)

// 删除
const getDel = params => Https.delete('/api/admin/background', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/background', params, true)

// 编辑
const getEdit = params => Https.put(`/api/admin/background/${params.id}`, params, true)

// 查详情
const getDetail = params => Https.get( `/api/admin/background/${params.id}`, params)

export {
  getListData, getAdd, getEdit, getDetail, getDel, getGradeList, getCategoryList,getGoldList,getSubjectList
}
