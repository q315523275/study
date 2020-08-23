import React, { Component } from 'react'
import {
  Table, Row, Col, Button, Switch, Input, Form, TreeSelect, Select, message,
} from 'antd'
import { connect } from 'dva'
import MyUpload from '@/components/my-upload'
import router from 'umi/router'
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
@connect(({ schoolCase, loading }) => ({ ...schoolCase, loading: loading.effects['schoolCase/getschoolCaseList'] }))
class Index extends Component {
  state = {
    isShowModal: false, // modal显影
    selectedRowKeys: [],
  }

  // 1:添加 2:编辑
  type = null

  // 编辑ID
  editId = null

  columns = [
    {
      title: '推荐至首页',
      dataIndex: 'hot',
      key: 'hot',
      render: hot => (hot ? '是' : '否'),
    },
    {
      title: '申请人中文名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '英文名称',
      dataIndex: 'nameEn',
      key: 'nameEn',
      ellipsis: true,
    },
    {
      title: '毕业院校',
      dataIndex: 'graduatedUniversity',
      key: 'graduatedUniversity',
      width: 100,
      align: 'center',
    },
    {
      title: '毕业专业',
      dataIndex: 'graduatedSubject',
      key: 'graduatedSubject',
      ellipsis: true,
    },
    {
      title: '毕业学位',
      dataIndex: 'graduatedDegree',
      key: 'graduatedDegree',
      ellipsis: true,
    },
    {
      title: '申请专业',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: '申请学位',
      dataIndex: 'degree',
      key: 'degree',
      ellipsis: true,
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      ellipsis: true,
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
    {
      title: '案例描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, reducer) => (
        <>
          <a style={{ marginRight: 10 }} onClick={() => { router.push(`/resource-library/school-Case/edit/${reducer.id}/?universityId=${this.props.universityId}`) }}>编辑</a>
          <a onClick={() => { this.deleteSchoolCase(reducer.id) }}>删除</a>
        </>
      ),
    },
  ]

  componentDidMount() {
    // this.getInitialData({})
  }

  // 获取表格初始化数据
  getInitialData = ({
    pageNumber = 1, pageSize = 10, query = {},
  }) => {
    const { universityId } = this.props
    this.props.dispatch({
      type: 'schoolCase/getUniversityCaseList',
      params: {
        pageNumber, pageSize, ...query, universityId,
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    const { query } = this.props
    this.getInitialData({ pageNumber: current, pageSize, query })
  }

  // 删除
  deleteSchoolCase = (id) => {
    const { universityId } = this.props
    this.props.dispatch({
      type: 'schoolCase/deleteCase',
      params: { ids: [id] },
      cb: () => {
        this.getInitialData({ pageNumber: this.props.pagination.current, pageSize: 10, query: this.props.query })
      },
    })
  }

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


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }


  painedFn = () => {
    const { selectedRowKeys } = this.state
    if (selectedRowKeys.length === 0) {
      message.info('请勾选')
      return
    }
    this.props.dispatch({
      type: 'schoolCase/pinned',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({}),
    })
  }

  unpinnedFn = () => {
    const { selectedRowKeys } = this.state
    console.log(selectedRowKeys)
    if (selectedRowKeys.length === 0) {
      message.info('请勾选')
      return
    }
    this.props.dispatch({
      type: 'schoolCase/unpinned',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({}),
    })
  }


  render() {
    const {
      form: { getFieldDecorator }, universityCaseList, loading, pagination, universityId,schoolName
    } = this.props
    console.log(this.props)
    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div className={style.tableArea}>
        {/* 搜索区域 */}
        <Row>
          <Col span={4}>
            <Form.Item label="关键字" {...formItemLayout}>
              {getFieldDecorator('query')(
                <Input placeholder="请输入关键字" size="small" maxLength={50} />,
              )}
            </Form.Item>
          </Col>
          {/* </Row> */}
          {/* <Row> */}
          <Col span={12}>
            <Form.Item
              wrapperCol={{
                xxl: { span: formItemLayout.wrapperCol.xxl.span, offset: formItemLayout.labelCol.xxl.span },
                xl: { span: formItemLayout.wrapperCol.xl.span, offset: formItemLayout.labelCol.xl.span },
              }}
            >
              <Button style={{ margin: 0 }} size="small" onClick={this.handleReload} icon="reload">重置</Button>
              <Button style={{ margin: '0 0 0 8px' }} size="small" type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
              <Button
                type="primary"
                size="small"
                style={{ margin: '0 0 10px 10px' }}
                onClick={this.painedFn}
              >推荐至首页
              </Button>
              <Button
                type="primary"
                size="small"
                style={{ margin: '0 0 10px 10px' }}
                onClick={this.unpinnedFn}
              >取消推荐
              </Button>
            </Form.Item>
          </Col>
          <Col span={8}>
            <MyUpload uploadType="universityCase" />
          </Col>
        </Row>
        {/* 表格区域 */}
        <Table
          rowKey="id"
          dataSource={universityCaseList}
          rowSelection={rowSelection}
          loading={loading}
          columns={this.columns}
          size="middle"
          onChange={this.tableChange}
          pagination={pagination}
        />
        <Button
          icon="plus"
          disabled={!universityId}
          block
          type="dashed"
          onClick={() => router.push(`/resource-library/school-Case/add?universityId=${universityId}&schoolName=${schoolName}`)}
        >添加案例
        </Button>
      </div>
    )
  }
}

export default Index
