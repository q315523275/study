import Https from '@/utils/https'

// 查询企业填报
const getDepDataReq = params => Https.get('/api/admin/department/tree', params)

// 新增
const getAdd = params => Https.post('地址', params)

// 编辑
const getEdit = params => Https.post('地址', params)

// 查详情
const getDetail = params => Https.post('地址', params)

export {
  getDepDataReq, getAdd, getEdit, getDetail,
}
