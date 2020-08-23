import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, TreeSelect,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PageLoading from '@/components/PageLoading'


const { Option } = Select
const routes = [
  {
    path: '/message-manage/column-maintain',
    breadcrumbName: '栏目维护库管理',
  },
  {
    breadcrumbName: '编辑栏目维护库',
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
@connect(({ columnMaintainEdit }) => ({ ...columnMaintainEdit }))
class ColumnMaintainEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch({type:'columnMaintainEdit/getDetail',params:{id}})
    this.props.dispatch({
      type: 'columnMaintainEdit/getModulesList',
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'columnMaintainEdit/getEdit',
          params: { ...values, id: this.props.match.params.id },
        })
      }
    })
  }

  onModuleChoose=(e) => {
    console.log(e)
    this.props.form.setFields({ pageId: '' })
    this.props.dispatch({
      type: 'columnMaintainEdit/getPagesList',
      params: {
        needEnd: '/pages',
        needId: e,
      },
    })
  }

  render() {
    const { form: { getFieldDecorator }, modulesList, pagesList ,initData} = this.props
    if (!initData) return <PageLoading />
    const {moduleId,pageId,name,subName,enable,infoItem,sort} = initData
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="模块名称">
            {getFieldDecorator('moduleId', {
              initialValue: moduleId,
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
              initialValue: pageId,
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
              initialValue: name,
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
              initialValue: subName,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="是否启用">
            {getFieldDecorator('enable', {
              initialValue: enable,
              rules: [{ required: true, message: '请选择' }],
            })(
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="是否信息栏目">
            {getFieldDecorator('infoItem', {
              initialValue: infoItem,
              rules: [{ required: true, message: '请选择' }],
            })(
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              initialValue: sort,
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
            <Button onClick={() => { router.push('/message-manage/column-maintain') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default ColumnMaintainEdit
