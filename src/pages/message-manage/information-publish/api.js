import Https from '@/utils/https'

// 获取模块列表
const getModulesList = params => Https.get('/api/admin/infoItem/modules', params)

// 获取属于单个模块的栏目树
const getItemsList = params => Https.get('/api/admin/infoItem/modules', params)

// 获取信息维护列表
const getListData = params => Https.get('/api/admin/infoItem/resources', params)

// 删除
const getDel = params => Https.delete('/api/admin/infoItem/resources', params, true)

// 新增
const getAdd = params => Https.post('/api/admin/infoItem/resources', params, true)

// 编辑
const getEditReq = params => Https.put(`/api/admin/infoItem/resources/${params.id}`, params, true)

// 发布
const getPublish = params => Https.post('/api/admin/infoItem/resources', params, true)

// 取消发布
const getUnPublish = params => Https.post('/api/admin/infoItem/resources', params, true)

// 查详情
const getDetail = params => Https.get(`/api/admin/infoItem/resources/${params.id}`, params)

// 查栏目详情
const getColumnDetail = params => Https.get(`/api/admin/infoItem/items/${params.id}`, params)



// 获取院校列表
const getUniversity = params => Https.get('/api/admin/university', params)
//获取专业库
const getSubject = params => Https.get('/api/admin/subject', params)
//院校专业库
const getUniversitySubject = params => Https.get('/api/admin/universitySubject', params)
//院校案例库
const getUniversityCase = params => Https.get('/api/admin/universityCase', params)
//暑期项目库
const getSummerProject = params => Https.get('/api/admin/summerProject', params)
//背景提升库
const getBackground = params => Https.get('/api/admin/background', params)


export {
  getColumnDetail,
  getListData,
  getAdd,
  getEditReq,
  getDetail,
  getDel,
  getModulesList,
  getItemsList,
  getUnPublish,
  getPublish,
  getUniversity,
  getSubject,
  getUniversitySubject,
  getUniversityCase,
  getSummerProject,
  getBackground
}
