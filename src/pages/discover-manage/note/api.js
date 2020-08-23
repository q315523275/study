import Https from '@/utils/https'

// 获取笔记列表
const getListData = params => Https.get('/api/admin/note', params,true)

// 获取选择时间内发布笔记的用户列表
const getUsersList = params => Https.get('/api/admin/note/active_users', params,true)

//获取审核状态
const getApplyStatus = params => Https.get('/api/common/dic/apply_status', params,true)

// 删除
const deleteNote = params => Https.delete('/api/admin/note', params,true)

// 置顶
const pinnedNote = params => Https.post('/api/admin/note/pinned', params,true)

// 审核
const applyNote = params => Https.post(`/api/admin/note/${params.noteId}/apply`, params,true)

export {
  getListData,getUsersList, deleteNote, pinnedNote, applyNote,getApplyStatus
}
