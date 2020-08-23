import { Result, Button } from 'antd'
import router from 'umi/router'


export default () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，您无权访问此页面"
    extra={<Button type="primary" onClick={() => router.push('/home')}>返回主页</Button>}
  />
)
