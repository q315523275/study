import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, 
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'

const { TextArea } = Input;
const routes = [
  {
    path: '/discover-manage/note',
    breadcrumbName: '笔记管理',
  },
  {
    breadcrumbName: '笔记审核',
  },
]
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}


@Form.create()
@connect(({ noteCheck }) => ({ ...noteCheck }))
class NoteCheck extends Component {
  componentDidMount() {
//   this.props.dispatch({
//     type: 'noteCheck/getTreeNodeDataReq',params:{}
//   })
  }

  handleSubmit=(applePass) => {
    const { form: { validateFields },match:{params:{id}} } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'noteCheck/applyNote',
          params: { ...values,applePass,noteId:id },
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="审核原因">
            {getFieldDecorator('processContent', {
            //   rules: [{ required: true, message: '请输入!' }],
            })(
              <TextArea
                maxLength={300}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={()=>this.handleSubmit(true)}>通过</Button>
            <Button type="primary" style={{ marginRight: 10 }} onClick={()=>this.handleSubmit(false)}>不通过</Button>
            <Button onClick={() => { router.push('/discover-manage/note') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default NoteCheck
