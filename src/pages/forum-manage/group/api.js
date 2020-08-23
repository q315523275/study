import Https from '@/utils/https'

// 查询树结构数据
const getTreeNodeDataReq = params => Https.get('/api/admin/forum/groupCategory', params)

// 添加节点
const addNodeReq = params => Https.post('/api/admin/forum/groupCategory', params, true)

// 根据ID修改节点名
const updateNodeReq = params => Https.put('/api/admin/forum/groupCategory', params, true)

// 根据ID删除节点
const deleteNodeReq = params => Https.delete('/api/admin/forum/groupCategory', params, true)


// 查询分类下所有小组信息
const queryGroupListReq = params => Https.get('/api/admin/forum/group', params)

// 新增小组
const addGroup = params => Https.post('/api/admin/forum/group', params, true)

// 编辑小组
const editGroup = params => Https.put(`/api/admin/forum/group/${params.id}`, params, true)

// 删除小组
const deleteGroup = params => Https.delete(`/api/admin/forum/group/${params.id}`, params, true)

// 启用
const groupEnable = params => Https.post(`/api/admin/forum/group/${params.id}/enable`, params, true)

// 禁用
const groupDisable = params => Https.post(`/api/admin/forum/group/${params.id}/disable`, params, true)

// 根据ID查询子用户信息
const queryChildUserInfoReq = params => Https.post('/api/v1/enterprise/user/selectEnpChildInfo ', params)

export {
  getTreeNodeDataReq, deleteNodeReq, addNodeReq, groupEnable,groupDisable, queryGroupListReq, queryChildUserInfoReq, addGroup, editGroup, updateNodeReq,deleteGroup
}
