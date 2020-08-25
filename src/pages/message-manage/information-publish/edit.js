import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, Modal, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import Editor from '@/components/B-Editor'
import moment from 'moment'
import PageLoading from '@/components/PageLoading'
import BraftEditor from 'braft-editor'
import { ModelBox } from './components'

const resourceList = ['', 'university', 'subject', 'universitySubject', 'universityCase', 'summerProject', 'background']
const { Option } = Select
const routes = [
  {
    path: '/message-manage/information-publish',
    breadcrumbName: '信息维护库管理',
  },
  {
    breadcrumbName: '编辑信息维护库',
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
@connect(({ informationPublishEdit }) => ({ ...informationPublishEdit }))
class InformationPublishEdit extends Component {
  state = { visible: false, resource: this.props.initData ? this.props.initData.resource : '', resourceId: '' };

  id = ''

  componentDidMount() {
    const { id } = this.props.match.params
    this.id = id
    this.props.dispatch({ type: 'informationPublishEdit/getDetail', params: { id }, cb: this.onModuleChoose })
    this.props.dispatch({
      type: 'informationPublishEdit/getModulesList',
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
          type: 'informationPublishEdit/getEdit',
          params: {
            ...values,
            itemId: itemId || itemFatherId,
            content: content.toHTML(),
            publishTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            publishStatus,
            resourceId,
            id: this.id,
            resource: resourceList[moduleId],
          },
        })
      }
    })
  }

  // 获取记录列表
  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'informationPublishEdit/getResource',
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
      type: 'informationPublishEdit/getItemsList',
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
      type: 'informationPublishEdit/save',
      payload: {
        resourceList: items,
      },
    })
  }

  render() {
    const {
      form: { getFieldDecorator }, modulesList, itemsList, resourceList, listData, pagination, initData,
    } = this.props
    const { resource } = this.state
    if (!initData) return <PageLoading />
    const {
      moduleId, itemId, content, enable, infoItem, sort, resourceId,
    } = initData
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
          <Form.Item label="栏目名称">
            {getFieldDecorator('itemFatherId', {
              initialValue: itemId,
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
              initialValue: itemId,
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
              initialValue: resource,
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
              initialValue: BraftEditor.createEditorState(content),
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
            initData={resourceId}
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

export default InformationPublishEdit
