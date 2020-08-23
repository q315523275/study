import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, TreeSelect,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import treeData from '@/static/js/area.json'

const { Option } = Select
const routes = [
  {
    path: '/resource-maintain/column-maintain',
    breadcrumbName: '栏目维护库管理',
  },
  {
    breadcrumbName: '新增栏目维护库',
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
@connect(({ columnMaintainAdd }) => ({ ...columnMaintainAdd }))
class ColumnMaintainAdd extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'columnMaintainAdd/getModulesList',
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        console.log(values)
        this.props.dispatch({
          type: 'columnMaintainAdd/getAdd',
          params: { ...values },
        })
      }
    })
  }

  onModuleChoose=(e) => {
    console.log(e)
    this.props.form.setFields({ pageId: '' })
    this.props.dispatch({
      type: 'columnMaintainAdd/getPagesList',
      params: {
        needEnd: '/pages',
        needId: e,
      },
    })
  }

  render() {
    const { form: { getFieldDecorator }, modulesList, pagesList } = this.props
    console.log(pagesList)
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="模块名称">
            {getFieldDecorator('moduleId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
                onSelect={this.onModuleChoose}
              >
                {modulesList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="页面名称">
            {getFieldDecorator('pageId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {pagesList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="栏目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="子栏目">
            {getFieldDecorator('subName', {
              // rules: [{ required: true, message: '请输入' }],
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
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="是否信息栏目">
            {getFieldDecorator('infoItem', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => { router.push('/column-maintain') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default ColumnMaintainAdd
