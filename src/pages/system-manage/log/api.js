import Https from '@/utils/https'

// 查询企业填报
const getListData = params => Https.get('/api/admin/operationLog', params)

// 新增
const getType = params => Https.get('/api/common/dic/operation_type', params)

// 编辑
const deleteOperation = params => Https.delete('/api/admin/operationLog', params)

// 查详情
const getDetail = params => Https.post('地址', params)

export {
  getListData, getType, deleteOperation, getDetail,
}
