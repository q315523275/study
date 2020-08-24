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
@connect(({ dictionaries, loading }) => ({
  ...dictionaries,
  loading: loading.effects['dictionaries/getListData'],
}))
class Example extends Component {
  columns = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'name9',
      key: 'name9',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/system-manage/dictionaries/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  getInitialData=({ pageNum = 1, pageSize = 10, query = '' }) => {
    this.props.dispatch({
      type: 'dictionaries/getListData',
      params: {
        pageNum,
        pageSize,
        query,
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    // this.getInitialData({ pageNum: current, pageSize })
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
        this.getInitialData({ ...submitData })
      }
    })
  }

  // 重置
  handleReset=() => {
    this.props.form.resetFields()
    this.getInitialData({})
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator },
    } = this.props
    return (
      <Card title="数据字典" bordered={false} className={style.schoolLibrary}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="国家/地区">
            {getFieldDecorator('query')(
              <Input placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => router.push('/system-manage/dictionaries/add')}
        >新增
        </Button>
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

export default Example
