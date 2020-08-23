import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, TreeSelect,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'

const { TextArea } = Input;
const { Option } = Select
const routes = [
  {
    path: '/resource-library/domain-library',
    breadcrumbName: '专业库管理',
  },
  {
    breadcrumbName: '新增专业',
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
@connect(({ domainLibraryAdd }) => ({ ...domainLibraryAdd }))
class DomainLibraryAdd extends Component {
  componentDidMount() {
    // getSubjectList
    this.props.dispatch({
      type: 'domainLibraryAdd/getSubjectList',
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'domainLibraryAdd/getAdd',
          params: { ...values },
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, subjectList } = this.props
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="专业中文名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="专业英文名">
            {getFieldDecorator('nameEn', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="学科">
            {getFieldDecorator('dicId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                onSelect={this.selectData}
                showSearch
                optionFilterProp="children"
              >
                {subjectList.map(({ id, name }, key) => <Option value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学制">
            {getFieldDecorator('schooling', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>

          <Form.Item label="USNEWS排名">
            {getFieldDecorator('usnewsRanking', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="QS排名">
            {getFieldDecorator('qsRanking', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="泰晤士排名">
            {getFieldDecorator('thamesRanking', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="上海交大排名">
            {getFieldDecorator('jiaotongRanking', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="是否热门专业">
            {getFieldDecorator('hot', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                onSelect={this.selectData}
                showSearch
                optionFilterProp="children"
              >
                <Option value>是</Option>
                <Option value={false}>否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remarks', {
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
            <Button onClick={() => { router.push('/resource-library/domain-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default DomainLibraryAdd
