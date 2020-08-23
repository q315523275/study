import Https from '@/utils/https'

// 获取当前用户的菜单
const getMenuReq = params => Https.post('/api/v1/auth/menuManage/build', params)

export { getMenuReq }
