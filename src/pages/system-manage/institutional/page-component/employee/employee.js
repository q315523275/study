import React, { Component } from 'react'
import {
  Table, Row, Col, Button, Modal, Input, Form, TreeSelect, Select, message,
} from 'antd'
import { connect } from 'dva'
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
      title: '序号',
      dataIndex: 'hot',
      key: 'hot',
      render: hot => (hot ? '是' : '否'),
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
    {
      title: '部门名称',
      dataIndex: 'subjectName',
      key: 'subjectName',
      ellipsis: true,
      render: (_, { subject }) => (subject ? subject.name : '--'),
    },
    {
      title: '部门性质',
      dataIndex: 'subjectNameEn',
      key: 'subjectNameEn',
      ellipsis: true,
      render: (_, { subject }) => (subject ? subject.nameEn : '--'),
    },
    {
      title: '负责人',
      dataIndex: 'totalRanking',
      key: 'totalRanking',
      width: 100,
      align: 'center',
      render: totalRanking => totalRanking || '--',
    },
    {
      title: '分机',
      dataIndex: 'subjectRanking',
      key: 'subjectRanking',
      ellipsis: true,
      render: totalRanking => totalRanking || '--',
    },
    {
      title: '邮箱',
      dataIndex: 'schooling',
      key: 'schooling',
      ellipsis: true,
      render: schooling => schooling || '--',
    },
    {
      title: '备注',
      dataIndex: 'schooling',
      key: 'schooling',
      ellipsis: true,
      render: schooling => schooling || '--',
    },

  ]

  componentDidMount() {
    // this.getInitialData({})
  }

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }))
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

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }


  render() {
    const {
      form: { getFieldDecorator }, universitySubjectList, loading, pagination, universityId,
    } = this.props

    const { selectedRowKeys, isShowModal } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div className={style.tableArea}>
        {/* 搜索区域 */}
        <Row>
          <Col span={16}>
            {getFieldDecorator('query')(
              <Input placeholder="请输入关键字" size="small" maxLength={50} />,
            )}
            <Button
              style={{ margin: 0 }}
              onClick={this.handleSearch}
              icon="search"
            >查询
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.toggleModal}>新增机构</Button>
          </Col>
        </Row>
        {/* 表格区域 */}
        <Table
          rowKey="id"
          dataSource={universitySubjectList}
          // rowSelection={rowSelection}
          loading={loading}
          columns={this.columns}
          size="middle"
          onChange={this.tableChange}
          pagination={pagination}
        />
        <Modal
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
          visible={isShowModal}>
          sss
        </Modal>

      </div>
    )
  }
}

export default Index
