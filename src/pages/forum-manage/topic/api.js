import Https from '@/utils/https'

// 获取笔记列表
const getListData = params => Https.get('/api/admin/forum/discussion', params)

// 获取选择时间内发布笔记的用户列表
const getUsersList = params => Https.get('/api/admin/forum/discussion/active_users', params,true)

//获取审核状态
const getApplyStatus = params => Https.get('/api/common/dic/apply_status', params,true)

// 删除
const deleteTopic = params => Https.delete('/api/admin/forum/discussion', params,true)

// 置顶
const pinnedTopic = params => Https.post('/api/admin/forum/discussion/pinned', params,true)

// 审核
const applyTopic = params => Https.post(`/api/admin/forum/discussion/${params.topicId}/apply`, params,true)

export {
  getListData,getUsersList, deleteTopic, pinnedTopic, applyTopic,getApplyStatus
}
