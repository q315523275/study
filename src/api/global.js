import Https from '@/utils/https'

const getMenuReq = params => Https.post(`${window.location.origin}/api/getMenu`, params)

const logoutReq = params => Https.post('/api/v1/user/user/logout', params, true)


export {
  getMenuReq, logoutReq,
}
