import Https from '@/utils/https'

// 获取国家院校
const getCountryList = params => Https.get('/api/admin/country/university', params)

// 获取院校列表
const getListData = params => Https.get('/api/admin/university', params)

// 删除
const getDel = params => Https.delete('/api/admin/university', params, true)

// 删除多个
const getDelArr = params => Https.delete('/api/admin/university', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/university', params, true)

// 编辑
const getEdit = params => Https.put('/api/admin/university', params, true)

// 查详情
const getDetail = params => Https.get('/api/admin/university', params)

// 置顶
const painedTop = params => Https.post(`/api/admin/${params.resource}/pinned`, params, true)

// 取消置顶
const unpainedTop = params => Https.post(`/api/admin/${params.resource}/un_pinned`, params, true)

export {
  getListData, getAdd, getEdit, getDetail, getDel, getCountryList, getDelArr, painedTop, unpainedTop,
}
