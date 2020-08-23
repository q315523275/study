let target = ''
switch (process.env.UMI_ENV) {
  case 'hj':
    target = 'http://10.45.29.224:9001'
    break
  case 'gray':
    target = 'http://60.173.17.241:8083/api'
    break
  case 'prod':
    target = 'http://47.102.204.236:8085/api'
    break
  default:
    target = 'http://47.114.151.211:8081/api'
}
export default {
  '/api': {
    target,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
  '/zuul': {
    target: `${target.replace('/api', '')}/zuul`,
    changeOrigin: true,
    pathRewrite: { '^/zuul': '' },
  },
}
