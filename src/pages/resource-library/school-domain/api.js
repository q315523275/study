import Https from '@/utils/https'

// 查询树结构数据
const getTreeNodeDataReq = params => Https.get('/api/admin/country/university', params)

// 查询分类下所有专业
const queryUniversitySubject = params => Https.get(`/api/admin/universitySubject/${params.universityId}`, params)

// 院校可添加的专业表数据
const subjectCanAdd = params => Https.get(`/api/admin/universitySubject/${params.universityId}/subject_enable`, params)

// 批量创建院校专业
const addSubject = params => Https.post(`/api/admin/universitySubject/${params.universityId}/subject`, params, true)

// 查看详情
const getDetail = params => Https.get(`/api/admin/universitySubject/details/${params.id}`, params)

// 编辑专业
const editSubject = params => Https.put(`/api/admin/universitySubject/${params[0].universityId}/subject`, params, true)

// 删除专业
const deleteSubject = params => Https.delete('/api/admin/universitySubject', params, true)

// 获取该院校的所有专业
const getAllSubject = params => Https.get(`/api/admin/universitySubject/${params.universityId}/subject_all`, params)


// 置顶
const pinnedTop = params => Https.post('/api/admin/universitySubject/pinned', params, true)

// 取消置顶
const unpinnedTop = params => Https.post('/api/admin/universitySubject/un_pinned', params, true)


export {
  getTreeNodeDataReq, getAllSubject, queryUniversitySubject, editSubject, deleteSubject, subjectCanAdd, addSubject, getDetail,
  pinnedTop, unpinnedTop,
}
