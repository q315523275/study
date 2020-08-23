import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, 
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import treeData from '@/static/js/area.json'

const { TextArea } = Input;
const { Option } = Select
const routes = [
  {
    path: '/forum-manage/group',
    breadcrumbName: '小组管理',
  },
  {
    breadcrumbName: '新增小组',
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
@connect(({ groupAdd }) => ({ ...groupAdd }))
class GroupAdd extends Component {
  componentDidMount() {
  this.props.dispatch({
    type: 'groupAdd/getTreeNodeDataReq',params:{}
  })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'groupAdd/getAdd',
          params: { ...values,image:'11112' },
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator },treeData } = this.props
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
        <Form.Item label="分类名称">
            {getFieldDecorator('categoryId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                onSelect={this.selectData}
                showSearch
                optionFilterProp="children"
              >
                {treeData.map((item,key)=><Option key={key} value={item.id}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="小组名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="是否启用">
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Radio.Group>
                <Radio value={true}>启用</Radio>
                <Radio value={false}>禁用</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="小组描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入!' }],
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
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => { router.push('/forum-manage/group') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default GroupAdd
