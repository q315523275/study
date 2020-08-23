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
    path: '/school-library',
    breadcrumbName: '案例管理',
  },
  {
    breadcrumbName: '新增案例',
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
@connect(({ schoolLibraryAdd }) => ({ ...schoolLibraryAdd }))
class SchoolLibraryAdd extends Component {
  componentDidMount() {
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'schoolLibraryAdd/getAdd',
          params: { ...values },
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
          <Form.Item label="院校中文名">
            {getFieldDecorator('name1', {
              rules: [{ required: true, message: '请输入院校中文名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="院校英文名">
            {getFieldDecorator('name2', {
              rules: [{ required: true, message: '请输入院校英文名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="所属国家/地区">
            {getFieldDecorator('name3', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                onSelect={this.selectData}
                showSearch
                optionFilterProp="children"
              >
                <Option value="1">国家1</Option>
                <Option value="2">国家2</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学校地址">
            {getFieldDecorator('name4', {
              rules: [{ required: true, message: '请输入学校地址!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="学校网址">
            {getFieldDecorator('name5', {
              rules: [{ required: true, message: '请输入学校网址!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="USNEWS排名">
            {getFieldDecorator('name6', {
              rules: [{ required: true, message: '请输入USNEWS排名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="QS排名">
            {getFieldDecorator('name7', {
              rules: [{ required: true, message: '请输入QS排名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="泰晤士排名">
            {getFieldDecorator('name8', {
              rules: [{ required: true, message: '请输入泰晤士排名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="上海交大排名">
            {getFieldDecorator('name9', {
              rules: [{ required: true, message: '请输入上海交大排名!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="年花费">
            {getFieldDecorator('name10', {
              rules: [{ required: true, message: '请输入年花费!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="平均录取率">
            {getFieldDecorator('name11', {
              rules: [{ required: true, message: '请输入平均录取率!' }],
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
            <Button onClick={() => { router.push('/school-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolLibraryAdd
