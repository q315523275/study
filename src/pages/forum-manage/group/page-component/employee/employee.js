import React, { Component } from 'react'
import {
  Table, Row, Col, Button, Switch, Input, Form, TreeSelect, Select,
} from 'antd'
import { connect } from 'dva'
import OperateMember from '../operateMember/operateMember'
import style from './style.less'
import router from 'umi/router'

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
@connect(({ group, loading }) => ({ ...group, loading: loading.effects['group/getGroupList'] }))
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
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '小组名称',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '成员数量',
      dataIndex: 'discussionCount',
      key: 'discussionCount',
      ellipsis: true,
    },
    {
      title: '内容数量',
      dataIndex: 'commentCount',
      key: 'commentCount',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'enable',
      key: 'enable',
      width: 100,
      align: 'center',
      render: (enable, { id }) => <Switch onChange={checked => this.switchChange(checked, id)} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={enable === true} />,
    },
    {
      title: '小组描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, reducer) => <>
      <a style={{marginRight:10}} onClick={() => {router.push(`/forum-manage/group/Edit/${JSON.stringify(reducer)}`)}}>编辑</a>
      <a onClick={() => {this.deleteGroup(reducer.id)}}>删除</a>
      </>,
    },
  ]

  componentDidMount() {
    // this.getInitialData({})
  }

  // 获取表格初始化数据
  getInitialData = ({
    pageNumber = 1, pageSize = 10, query = {},
  }) => {
    const { currentDeptId } = this.props
    this.props.dispatch({ type: 'group/getGroupList', params:{
      pageNumber, pageSize, ...query, categoryId: currentDeptId,
    } })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    const { query } = this.props
    this.getInitialData({ pageNumber: current, pageSize, query })
  }

  // 启用与禁用
  switchChange = (checked, id) => { this.props.dispatch({ type: 'group/groupEnableDisable', params: { id },state: checked }) }

  //删除
  deleteGroup = ( id) => { this.props.dispatch({ 
    type: 'group/deleteGroup',
     params: { id } ,
     cb:()=>{
       this.getInitialData({ pageNumber: this.props.pagination.current, pageSize:10, query:this.props.query })
     }
    }) }

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

  render() {
    const { isShowModal } = this.state
    const {
      form: { getFieldDecorator }, groupListData, loading, pagination,
    } = this.props
    console.log(groupListData)
    return (
      <div className={style.tableArea}>
        {/* 搜索区域 */}
        <Row>
        <Col span={8}>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('enable')(
                <Select placeholder="请选择状态" size="small" style={{ width: '100%' }}>
                  <Option key={1} value={true}>启用</Option>
                  <Option key={2} value={false}>禁用</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="关键字" {...formItemLayout}>
              {getFieldDecorator('query')(
                <Input placeholder="请输入关键字" size="small" maxLength={50} />,
              )}
            </Form.Item>
          </Col>
        {/* </Row> */}
        {/* <Row> */}
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
          dataSource={groupListData}
          loading={loading}
          columns={this.columns}
          size="middle"
          onChange={this.tableChange}
          pagination={pagination}
        />
        <Button icon="plus" block type="dashed" onClick={()=>router.push('/forum-manage/group/add')}>添加子账号</Button>
      </div>
    )
  }
}

export default Index
