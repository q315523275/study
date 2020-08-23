import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, 
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import treeData from '@/static/js/area.json'
import PageLoading from '@/components/PageLoading'

const { TextArea } = Input;
const { Option } = Select
const routes = [
  {
    path: '/resource-library/school-domain',
    breadcrumbName: '院校专业库管理',
  },
  {
    breadcrumbName: '编辑院校专业',
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
@connect(({ schoolDomainEdit }) => ({ ...schoolDomainEdit }))
class SchoolDomainEdit extends Component {
  componentDidMount() {
  const {location:{query:{universityId}},match:{params:{id}}} = this.props
  //getDetail
  this.props.dispatch({
    type: 'schoolDomainEdit/getDetail',params:{id}
  })
  }

  componentWillMount(){
    this.props.dispatch({type: 'schoolDomainEdit/clearAll' })
  }

  handleSubmit=(id) => {
    const { form: { validateFields },location:{query:{universityId}} } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'schoolDomainEdit/getEdit',
          params: { ...values,id,universityId },
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator },treeData,initData } = this.props
    const {id} = this.props.match.params
    if(!initData) return <PageLoading/>
    const {totalRanking,subjectRanking,schooling,gre,toelf,applyTuition,tuition,mailbox} = initData
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
        <Form.Item label="综合排名">
            {getFieldDecorator('totalRanking', {
              initialValue:totalRanking,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="专业排名">
            {getFieldDecorator('subjectRanking', {
              initialValue:subjectRanking,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="学制">
            {getFieldDecorator('schooling', {
              initialValue:schooling,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="GRE/GMAT">
            {getFieldDecorator('gre', {
              initialValue:gre,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="TOEFL/IELTS">
            {getFieldDecorator('toelf', {
              initialValue:toelf,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="申请费">
            {getFieldDecorator('applyTuition', {
              initialValue:applyTuition,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="学费/学年">
            {getFieldDecorator('tuition', {
              initialValue:tuition,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
              maxLength={30}
              placeholder="请输入"
            />,
            )}
          </Form.Item>
          <Form.Item label="咨询信箱">
            {getFieldDecorator('mailbox', {
              initialValue:mailbox,
              rules: [{ required: true, message: '请输入!' }],
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
            <Button type="primary" style={{ marginRight: 10 }} onClick={()=>this.handleSubmit(id)}>提交</Button>
            <Button onClick={() => { router.push('/resource-library/school-domain') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolDomainEdit
