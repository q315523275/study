import Https from '@/utils/https'

// 查询意见反馈列表
const getListData = params => Https.get('/api/admin/feedback', params,true)

// 意见反馈附件列表
const getEnclosureList = params => Https.get(`/api/admin/feedback/${params.id}/files`, params,true)

// 编辑
const getEdit = params => Https.post('地址', params)

// 查详情
const getDetail = params => Https.post('地址', params)

export {
  getListData, getEnclosureList, getEdit, getDetail,
}
