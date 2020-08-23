import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, TreeSelect, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PageLoading from '@/components/PageLoading'

const { Option } = Select
const routes = [
  {
    path: '/school-library',
    breadcrumbName: '案例管理',
  },
  {
    breadcrumbName: '编辑案例',
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
@connect(({ schoolLibraryEdit }) => ({ ...schoolLibraryEdit }))
class SchoolLibraryEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match
    this.props.dispatch({
      type: 'schoolLibraryEdit/getDetail',
      params: {
        id,
      },
    })
  }


  componentWillUnmount() {
    this.props.dispatch({
      type: 'schoolLibraryEdit/save',
      payload: {
        initData: null,
      },
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'schoolLibraryEdit/getEdit',
          params: { ...values, ...this.props.match.params },
        })
      }
      console.log({ ...values, ...this.props.match.params })
    })
  }


  render() {
    const {
      form: { getFieldDecorator }, initData,
    } = this.props
    if (!initData) return <PageLoading />
    const {
      name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, name11,
    } = initData
    console.log(initData)
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="院校中文名">
            {getFieldDecorator('name1', {
              rules: [{ required: true, message: '请输入院校中文名!' }],
              initialValue: name1,
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
              initialValue: name2,
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
              initialValue: name3,
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
              initialValue: name4,
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
              initialValue: name5,
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
              initialValue: name6,
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
              initialValue: name7,
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
              initialValue: name8,
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
              initialValue: name9,
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
              initialValue: name10,
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
              initialValue: name11,
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
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>更新</Button>
            <Button onClick={() => { router.push('/school-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolLibraryEdit
