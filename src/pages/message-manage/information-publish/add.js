import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, Modal, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import Editor from '@/components/B-Editor'
import moment from 'moment'
import { ModelBox } from './components'

const resourceList = ['', 'university', 'subject', 'universitySubject', 'universityCase', 'summerProject', 'background']
const { Option } = Select
const routes = [
  {
    path: '/message-manage/information-publish',
    breadcrumbName: '信息维护库管理',
  },
  {
    breadcrumbName: '新增信息维护库',
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
@connect(({ informationPublishAdd }) => ({ ...informationPublishAdd }))
class InformationPublishAdd extends Component {
  state = { visible: false, resource: '', resourceId: '' };

  componentDidMount() {
    this.props.dispatch({
      type: 'informationPublishAdd/getModulesList',
    })
  }

  // 记录弹出框
  modalToggle=() => {
    this.setState(({ visible }) => ({ visible: !visible }))
  }

  // 改变记录输入框的方法（用于传入子组件调用绑定）
  resourceChange = ({ resource, resourceId }) => {
    this.setState({ resource, resourceId })
    this.props.form.setFieldsValue({ resource })
  }

  handleSubmit=(publishStatus) => {
    const { form: { validateFields } } = this.props
    const { resourceId } = this.state
    validateFields((errors, values) => {
      if (!errors) {
        const {
          content, itemFatherId, itemId, moduleId,
        } = values
        const LENGTH = content.toHTML().length // 富文本的长度
        if (LENGTH === 7) {
          message.error('信息内容不能为空')
          return
        }
        this.props.dispatch({
          type: 'informationPublishAdd/getAdd',
          params: {
            ...values,
            itemId: itemId || itemFatherId,
            content: content.toHTML(),
            publishTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            publishStatus,
            resourceId,
            resource: resourceList[moduleId],
          },
        })
      }
    })
  }

  // 获取记录列表
  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'informationPublishAdd/getResource',
      params: {
        pageNumber,
        pageSize,
        ...query,
      },
    })
  }

  onModuleChoose=async (e) => {
    this.props.form.setFields({ itemId: '', resourceId: '' })
    this.resource = ''
    await this.props.dispatch({
      type: 'informationPublishAdd/getItemsList',
      params: {
        needEnd: '/items',
        needId: e,
      },
      chooseType: resourceList[e],
    })
    this.getInitialData({})
  }

  onItemChoose=(items) => {
    this.props.form.setFields({ resourceId: '' })
    this.resource = ''
    this.props.dispatch({
      type: 'informationPublishAdd/save',
      payload: {
        resourceList: items,
      },
    })
  }

  render() {
    const {
      form: { getFieldDecorator }, modulesList, itemsList, resourceList, listData, pagination,
    } = this.props
    const { resource } = this.state
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
          <Form.Item label="栏目名称">
            {getFieldDecorator('itemFatherId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {itemsList.map(({ itemId, name, items }, key) => <Option onClick={() => this.onItemChoose(items)} key={key} value={itemId}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="子栏目">
            {getFieldDecorator('itemId', {
              // rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {resourceList.map(({ id, name }, key) => <Option onClick={() => this.resource = name} key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="记录">
            {getFieldDecorator('resource', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Input disabled />,
            )}
            <Button onClick={this.modalToggle}>选择记录</Button>
          </Form.Item>
          <Form.Item
            label="信息内容"
            className="editor"
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '信息内容不能为空' }],
            })(
              <Editor placeholder="请输入信息内容" />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.handleSubmit(false)}>保存</Button>
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.handleSubmit(true)}>发布</Button>
            <Button onClick={() => { router.push('/information-publish') }}>取消</Button>
          </Col>
        </Row>
        <Modal
          title="记录"
          visible={this.state.visible}
          onOk={this.modalToggle}
          onCancel={this.modalToggle}
        >
          <ModelBox
            listData={listData}
            pagination={pagination}
            getInitialData={this.getInitialData}
            resourceChange={this.resourceChange}
          />
        </Modal>
      </Card>
    )
  }
}

export default InformationPublishAdd
