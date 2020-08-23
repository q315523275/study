import { Result, Button } from 'antd'
import router from 'umi/router'


export default () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起，您访问的页面不存在"
    extra={<Button type="primary" onClick={() => router.push('/home')}>返回主页</Button>}
  />
)
