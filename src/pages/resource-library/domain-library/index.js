import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button, Row, Col, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import MyUpload from '@/components/my-upload'
import style from './style.less'

const { Option } = Select
@Form.create()
@connect(({ domainLibraryT, loading }) => ({ ...domainLibraryT, loading: loading.effects['domainLibraryT/getListData'] }))
class DomainLibraryT extends Component {
  state = {
    selectedRowKeys: [],
  }

  columns = [
    {
      title: '推荐至首页',
      dataIndex: 'hot',
      key: 'hot',
      render: hot => (hot ? '是' : '否'),
    },
    {
      title: '专业中文名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '专业英文名',
      dataIndex: 'nameEn',
      key: 'nameEn',
      ellipsis: true,
    },
    {
      title: '学科',
      dataIndex: 'dic',
      key: 'dic',
      ellipsis: true,
    },
    {
      title: '学制',
      dataIndex: 'schooling',
      key: 'schooling',
      ellipsis: true,
      render: schooling => schooling || '--',
    },
    {
      title: 'USNEWS排名',
      dataIndex: 'usnewsRanking',
      key: 'usnewsRanking',
      ellipsis: true,
    },
    {
      title: 'QS排名',
      dataIndex: 'qsRanking',
      key: 'qsRanking',
      ellipsis: true,
    },
    {
      title: '泰晤士排名',
      dataIndex: 'thamesRanking',
      key: 'thamesRanking',
      ellipsis: true,
    },
    {
      title: '上海交大排名',
      dataIndex: 'jiaotongRanking',
      key: 'jiaotongRanking',
      ellipsis: true,
    },
    {
      title: '是否热门专业',
      dataIndex: 'hot',
      key: 'hot',
      ellipsis: true,
      render: hot => (hot ? '是' : '否'),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/resource-library/domain-library/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'domainLibraryT/getListData',
      params: {
        pageNumber,
        pageSize,
        ...query,
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    const { query } = this.props
    this.getInitialData({ pageNumber: current, pageSize, query })
  }

  // 搜索
  handleSearch=() => {
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

  // 重置
  handleReset=() => {
    this.props.form.resetFields()
    this.getInitialData({})
  }

  // 删除单个
  delData=(needId) => {
    this.props.dispatch({
      type: 'domainLibraryT/getDel',
      params: {
        needId,
      },
      cb: () => this.getInitialData({}),
    })
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
      type: 'domainLibraryT/pinned',
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
      type: 'domainLibraryT/unpinned',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({}),
    })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator },
    } = this.props
    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card title="专业库列表" bordered={false} className={style.domainLibraryT}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Row>
          <Col span={12}>
            <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/resource-library/domain-library/add')}>新增</Button>

            <Button
              type="primary"
              style={{ margin: '0 0 10px 10px' }}
              onClick={this.painedFn}
            >推荐至首页
            </Button>
            <Button
              type="primary"
              style={{ margin: '0 0 10px 10px' }}
              onClick={this.unpinnedFn}
            >取消推荐
            </Button>
          </Col>
          <Col span={12}>
            <MyUpload uploadType="subject" />
          </Col>
        </Row>
        <Table
          rowKey="id"
          dataSource={listData}
          loading={loading}
          rowSelection={rowSelection}
          pagination={pagination}
          columns={this.columns}
          onChange={this.tableChange}
        />
      </Card>
    )
  }
}

export default DomainLibraryT
