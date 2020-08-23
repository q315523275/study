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
@connect(({ schoolDomain, loading }) => ({ ...schoolDomain, loading: loading.effects['schoolDomain/getUniversitySubjectList'] }))
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
      title: '学科',
      dataIndex: 'remarks',
      key: 'remarks',
      ellipsis: true,
      render: (_, { subject }) => (subject ? subject.dic : '--'),
    },
    {
      title: '专业中文名称',
      dataIndex: 'subjectName',
      key: 'subjectName',
      ellipsis: true,
      render: (_, { subject }) => (subject ? subject.name : '--'),
    },
    {
      title: '专业英文名称',
      dataIndex: 'subjectNameEn',
      key: 'subjectNameEn',
      ellipsis: true,
      render: (_, { subject }) => (subject ? subject.nameEn : '--'),
    },
    {
      title: '综合排名',
      dataIndex: 'totalRanking',
      key: 'totalRanking',
      width: 100,
      align: 'center',
      render: totalRanking => totalRanking || '--',
    },
    {
      title: '专业排名',
      dataIndex: 'subjectRanking',
      key: 'subjectRanking',
      ellipsis: true,
      render: totalRanking => totalRanking || '--',
    },
    {
      title: '学制',
      dataIndex: 'schooling',
      key: 'schooling',
      ellipsis: true,
      render: schooling => schooling || '--',
    },
    {
      title: 'GRE/GMAT',
      dataIndex: 'gre',
      key: 'gre',
      ellipsis: true,
      render: gre => gre || '--',
    },
    {
      title: 'TOEFL/IELTS',
      dataIndex: 'toelf',
      key: 'toelf',
      ellipsis: true,
      render: toelf => toelf || '--',
    },
    {
      title: '申请费',
      dataIndex: 'applyTuition',
      key: 'applyTuition',
      ellipsis: true,
      render: applyTuition => applyTuition || '--',
    },
    {
      title: '学费/学年',
      dataIndex: 'tuition',
      key: 'tuition',
      ellipsis: true,
      render: tuition => tuition || '--',
    },
    {
      title: '咨询信箱',
      dataIndex: 'mailbox',
      key: 'mailbox',
      ellipsis: true,
      render: mailbox => mailbox || '--',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, reducer) => (
        <>
          <a style={{ marginRight: 10 }} onClick={() => { router.push(`/resource-library/school-domain/edit/${reducer.id}/?universityId=${this.props.universityId}`) }}>编辑</a>
          <a onClick={() => { this.deleteSchoolDomain(reducer.id) }}>删除</a>
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
      type: 'schoolDomain/getUniversitySubjectList',
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
  deleteSchoolDomain = (id) => {
    const { universityId } = this.props
    this.props.dispatch({
      type: 'schoolDomain/deleteSubject',
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

  painedFn = () => {
    const { selectedRowKeys } = this.state
    if (selectedRowKeys.length === 0) {
      message.info('请勾选')
      return
    }
    this.props.dispatch({
      type: 'schoolDomain/pinned',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({ pageNumber: this.props.pagination.current, pageSize: 10, query: this.props.query })
      ,
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
      type: 'schoolDomain/unpinned',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({ pageNumber: this.props.pagination.current, pageSize: 10, query: this.props.query })
      ,
    })
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }


  render() {
    const {
      form: { getFieldDecorator }, universitySubjectList, loading, pagination, universityId,
    } = this.props

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
              <Button style={{ margin: 0 }} size="small" type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
              <Button style={{ margin: '0 0 0 8px' }} size="small" onClick={this.handleReload} icon="reload">重置</Button>
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
            <MyUpload uploadType="universitySubject" />
          </Col>
        </Row>
        {/* 表格区域 */}
        <Table
          rowKey="id"
          dataSource={universitySubjectList}
          rowSelection={rowSelection}
          loading={loading}
          columns={this.columns}
          size="middle"
          onChange={this.tableChange}
          pagination={pagination}
        />
        <Button icon="plus" disabled={!universityId} block type="dashed" onClick={() => router.push(`/resource-library/school-domain/add?universityId=${universityId}`)}>添加专业</Button>
      </div>
    )
  }
}

export default Index
