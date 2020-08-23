import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import style from './style.less'

const { Option } = Select
@Form.create()
@connect(({ columnMaintain, loading }) => ({ ...columnMaintain, loading: loading.effects['columnMaintain/getListData'] }))
class columnMaintain extends Component {
  columns = [
    {
      title: '模块名称',
      dataIndex: 'moduleName',
      key: 'moduleName',
      ellipsis: true,
    },
    {
      title: '页面名称',
      dataIndex: 'pageName',
      key: 'pageName',
      ellipsis: true,
      render: pageName => pageName || '--',
    },
    {
      title: '栏目名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '子栏目',
      dataIndex: 'subName',
      key: 'subName',
      ellipsis: true,
      render: subName => subName || '--',
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      ellipsis: true,
      render: enable => (enable ? '是' : '否'),
    },
    {
      title: '是否信息栏目',
      dataIndex: 'infoItem',
      key: 'infoItem',
      ellipsis: true,
      render: infoItem => (infoItem ? '是' : '否'),

    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/message-manage/column-maintain/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.props.dispatch({
      type: 'columnMaintain/getCountryList',
    })
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'columnMaintain/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'columnMaintain/getListData',
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
      type: 'columnMaintain/getDel',
      params: {
        needId,
      },
      cb: () => this.getInitialData({}),
    })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator },
    } = this.props
    return (
      <Card title="栏目维护库列表" bordered={false} className={style.columnMaintain}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/message-manage/column-maintain/add')}>新增</Button>
        <Table
          rowKey="id"
          dataSource={listData}
          loading={loading}
          pagination={pagination}
          columns={this.columns}
          onChange={this.tableChange}
        />
      </Card>
    )
  }
}

export default columnMaintain
