import Https from '@/utils/https'

// 查询树结构数据
const getTreeNodeDataReq = params => Https.post('/api/v1/enterprise/user/selectEnpDept', params)

// 添加节点
const addNodeReq = params => Https.post('/api/v1/enterprise/user/addEnpDept', params, true)

// 根据ID修改节点名
const updateNodeReq = params => Https.post('/api/v1/enterprise/user/updateEnpDept', params, true)

// 根据ID删除节点
const deleteNodeReq = params => Https.post('/api/v1/enterprise/user/delEnpDept', params, true)


// 查询企业用户下所有子账号信息
const queryAccountListReq = params => Https.post('/api/v1/enterprise/user/selectEnpChildById', params)

// 企业子账号注册
const registerAccountReq = params => Https.post('/api/v1/enterprise/user/subUserRegister', params, true)

// 企业子账号编辑修改
const updateAccountInfoReq = params => Https.post('/api/v1/enterprise/user/modifySubAccountById', params, true)

// 冻结，解冻
const freezeUserReq = params => Https.post('/api/v1/enterprise/user/changeUserState', params, true)

// 根据ID查询子用户信息
const queryChildUserInfoReq = params => Https.post('/api/v1/enterprise/user/selectEnpChildInfo ', params)

export {
  getTreeNodeDataReq, deleteNodeReq, addNodeReq, freezeUserReq, queryAccountListReq, queryChildUserInfoReq, registerAccountReq, updateAccountInfoReq, updateNodeReq,
}
