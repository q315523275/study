import React, { Component } from 'react'
import {
  Table, Row, Col, Button, Switch, Input, Form, TreeSelect, Select,
} from 'antd'
import { connect } from 'dva'
import style from './style.less'

const { TreeNode } = TreeSelect
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xxl: { span: 4 },
    xl: { span: 5 },
  },
  wrapperCol: {
    xxl: { span: 12 },
    xl: { span: 16 },
  },
}
@Form.create()
@connect(({ organization, loading }) => ({ ...organization, loading: loading.effects['organization/getAccountList'] }))
class Index extends Component {
  state = {
    isShowModal: false, // modal显影
  }

  // 1:添加 2:编辑
  type = null

  // 编辑ID
  editId = null

  columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'contacts',
      key: 'contacts',
      ellipsis: true,
    },
    {
      title: '手机号码',
      dataIndex: 'contactsPhone',
      key: 'mobilePhone',
      ellipsis: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName',
      ellipsis: true,
      render: deptName => <span>{deptName || '暂无数据'}</span>,
    },
    {
      title: '冻结',
      dataIndex: 'state',
      key: 'state',
      width: 200,
      align: 'center',
      render: (state, { id }) => <Switch onChange={checked => this.switchChange(checked, id)} checkedChildren="开" unCheckedChildren="关" defaultChecked={state === 2} />,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, { id, state }) => <a onClick={() => this.editMember(id)}>编辑</a>,
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  // 获取表格初始化数据
  getInitialData = ({
    pageNum = 1, pageSize = 10, query = null,
  }) => {
    const { currentDeptId } = this.props
    let params = null
    if (query) {
      params = {
        pageNum, pageSize, ...query, deptId: currentDeptId,
      }
    } else {
      params = { pageNum, pageSize, deptId: currentDeptId }
    }
    this.props.dispatch({ type: 'organization/getAccountList', params })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    const { query } = this.props
    this.getInitialData({ pageNum: current, pageSize, query })
  }

  // 冻结与解冻
  switchChange = (checked, id) => { this.props.dispatch({ type: 'organization/freezeUser', params: { id, state: checked ? 2 : 1 } }) }

  // 搜索
  handleSearch = () => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const submitData = {}
        Object.keys(values).forEach((key) => {
          if (values[key] !== undefined && values[key] !== '') { // 无该条件就不传该字段
            submitData[key] = values[key]
          }
        })
        this.getInitialData({ query: submitData })
      }
    })
  }

  // 搜索重置
  handleReload = () => {
    this.props.form.resetFields()
    this.getInitialData({})
  }

  // 渲染树结构
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode
          title={item.name}
          key={item.id}
          value={item.id}
        >
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return (
      <TreeNode
        key={item.id}
        title={item.name}
        value={item.id}
      />
    )
  })

  render() {
    const { isShowModal } = this.state
    const {
      form: { getFieldDecorator }, memberListData, loading, pagination,
    } = this.props
    return (
      <div className={style.tableArea}>
        {/* 搜索区域 */}
        <Row>
          <Col span={8}>
            <Form.Item label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName')(
                <Input placeholder="请输入用户名" size="small" maxLength={50} />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="姓名" {...formItemLayout}>
              {getFieldDecorator('contacts')(
                <Input placeholder="请输入姓名" size="small" maxLength={50} />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('state')(
                <Select placeholder="请选择状态" size="small" style={{ width: '100%' }}>
                  <Option key={1} value={1}>未冻结</Option>
                  <Option key={2} value={2}>已冻结</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{
                xxl: { span: formItemLayout.wrapperCol.xxl.span, offset: formItemLayout.labelCol.xxl.span },
                xl: { span: formItemLayout.wrapperCol.xl.span, offset: formItemLayout.labelCol.xl.span },
              }}
            >
              <Button style={{ margin: 0 }} size="small" onClick={this.handleReload} icon="reload">重置</Button>
              <Button style={{ margin: '0 0 0 8px' }} size="small" type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
            </Form.Item>
          </Col>
        </Row>
        {/* 表格区域 */}
        <Table
          rowKey="id"
          dataSource={memberListData}
          loading={loading}
          columns={this.columns}
          size="middle"
          onChange={this.tableChange}
          pagination={pagination}
        />
      </div>
    )
  }
}

export default Index
