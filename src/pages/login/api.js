import Https from '@/utils/https'

const queryLogin = params => Https.post('/api/admin/user/login', params, true)

export { queryLogin }
