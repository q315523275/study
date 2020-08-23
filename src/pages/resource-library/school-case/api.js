import Https from '@/utils/https'

// 查询树结构数据
const getTreeNodeDataReq = params => Https.get('/api/admin/country/university', params)

// 查询分类下院校案例列表
const queryUniversityCase = params => Https.get('/api/admin/universityCase', params)


// 创建院校案例
const addCase = params => Https.post('/api/admin/universityCase', params, true)

// 查看详情
const detailCase = params => Https.get(`/api/admin/universityCase/${params.id}`, params)

// 编辑案例
const editCase = params => Https.put(`/api/admin/universityCase/${params.id}`, params, true)

// 删除案例
const deleteCase = params => Https.delete(`/api/admin/universityCase/${params.id}`, params, true)

// 获取学位字典项
const getAllDegree = params => Https.get('/api/common/dic/degree', params)

// 获取该院校的所有专业
const getAllSubject = params => Https.get(`/api/admin/universitySubject/${params.universityId}/subject_all`, params)

// 置顶
const pinnedTop = params => Https.post('/api/admin/universityCase/pinned', params, true)

// 取消置顶
const unpinnedTop = params => Https.post('/api/admin/universityCase/un_pinned', params, true)


export {
  getTreeNodeDataReq, deleteCase, queryUniversityCase, editCase, addCase, getAllDegree, detailCase, getAllSubject,
  pinnedTop, unpinnedTop,
}
