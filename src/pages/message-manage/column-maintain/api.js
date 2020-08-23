import Https from '@/utils/https'

// 获取模块列表
const getModulesList = params => Https.get('/api/admin/infoItem/modules', params)

// 获取属于单个模块的页面列表
const getPagesList = params => Https.get('/api/admin/infoItem/modules', params)

// 获取栏目维护列表
const getListData = params => Https.get('/api/admin/infoItem/items', params)

// 删除
const getDel = params => Https.delete('/api/admin/infoItem/items', params, true)

// 删除多个
const getDelArr = params => Https.delete('/api/admin/infoItem/items', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/infoItem/items', params, true)

// 编辑
const getEdit = params => Https.put(`/api/admin/infoItem/items/${params.id}`, params, true)

// 查详情
const getDetail = params => Https.get(`/api/admin/infoItem/items/${params.id}`, params)

export {
  getListData, getAdd, getEdit, getDetail, getDel, getModulesList, getDelArr, getPagesList,
}
