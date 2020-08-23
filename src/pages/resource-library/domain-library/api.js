import Https from '@/utils/https'

// 获取学科数据字典列表
const getSubjectList = params => Https.get('/api/admin/datadictionary/system/subject', params)

// 获取专业列表
const getListData = params => Https.get('/api/admin/subject', params)

// 删除
const getDel = params => Https.delete('/api/admin/subject', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/subject', params, true)

// 编辑
const getEdit = params => Https.put('/api/admin/subject', params, true)

// 查详情
const getDetail = params => Https.get('/api/admin/subject', params)

// 置顶
const pinnedTop = params => Https.post('/api/admin/subject/pinned', params, true)

// 取消置顶
const unpinnedTop = params => Https.post('/api/admin/subject/un_pinned', params, true)

export {
  getSubjectList, getListData, getAdd, getEdit, getDetail, getDel, pinnedTop, unpinnedTop,
}
