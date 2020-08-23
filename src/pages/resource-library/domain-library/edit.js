import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, TreeSelect, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PageLoading from '@/components/PageLoading'

const { Option } = Select
const { TextArea } = Input
const routes = [
  {
    path: '/resource-library/domain-library',
    breadcrumbName: '专业库管理',
  },
  {
    breadcrumbName: '编辑专业',
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
@connect(({ domainLibraryEdit, loading }) => ({ ...domainLibraryEdit, Loading: loading.effects['domainLibraryEdit/getDetail'] }))
class DomainLibraryEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch({
      type: 'domainLibraryEdit/getDetail',
      params: {
        needId: id,
      },
    })
    this.props.dispatch({
      type: 'domainLibraryEdit/getSubjectList',
    })
  }


  componentWillUnmount() {
    this.props.dispatch({
      type: 'domainLibraryEdit/save',
      payload: {
        initData: null,
      },
    })
  }

  handleSubmit=() => {
    const { id } = this.props.match.params
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'domainLibraryEdit/getEdit',
          params: { ...values, ...this.props.match.params, needId: id },
        })
      }
    })
  }


  render() {
    const {
      form: { getFieldDecorator }, Loading, subjectList, initData,
    } = this.props
    if (!initData) return <PageLoading />
    const {
      name, nameEn, remarks, dicId, usnewsRanking, qsRanking, thamesRanking, jiaotongRanking, hot, schooling,
    } = initData
    console.log(initData)
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="专业中文名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: name,
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
              initialValue: nameEn,
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
              initialValue: dicId,
            })(
              <Select
                placeholder="请选择"
                onSelect={this.selectData}
                showSearch
                optionFilterProp="children"
              >
                {subjectList.map((item, key) => <Option value={item.id} key={key}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学制">
            {getFieldDecorator('schooling', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: schooling,
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
              initialValue: usnewsRanking,
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
              initialValue: qsRanking,
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
              initialValue: thamesRanking,
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
              initialValue: jiaotongRanking,
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
              initialValue: hot,
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
              initialValue: remarks,
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
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>更新</Button>
            <Button onClick={() => { router.push('/resource-library/domain-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default DomainLibraryEdit
