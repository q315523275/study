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
@connect(({ schoolLibrary, loading }) => ({ ...schoolLibrary, loading: loading.effects['schoolLibrary/getListData'] }))
class Example extends Component {
  columns = [
    {
      title: '学科',
      dataIndex: 'name3',
      key: 'name3',
      ellipsis: true,
    },
    {
      title: '学制',
      dataIndex: 'name4',
      key: 'name4',
      ellipsis: true,
    },
    {
      title: '专业中文名称',
      dataIndex: 'name1',
      key: 'name1',
      ellipsis: true,
    },
    {
      title: '专业英文名称',
      dataIndex: 'name2',
      key: 'name2',
      ellipsis: true,
    },
    {
      title: 'USNEWS排名',
      dataIndex: 'name5',
      key: 'name5',
      ellipsis: true,
    },
    {
      title: 'QS排名',
      dataIndex: 'name6',
      key: 'name6',
      ellipsis: true,
    },
    {
      title: '泰晤士排名',
      dataIndex: 'name7',
      key: 'name7',
      ellipsis: true,
    },
    {
      title: '上海交大排名',
      dataIndex: 'name7',
      key: 'name7',
      ellipsis: true,
    },
    {
      title: '是否热门专业',
      dataIndex: 'name8',
      key: 'name8',
      ellipsis: true,
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
          <Button type="link" onClick={() => router.push(`/school-library/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    // this.getInitialData({})
  }

  getInitialData=({ pageNum = 1, pageSize = 10 }) => {
    this.props.dispatch({
      type: 'report/getListData',
      params: {
        pageNum,
        pageSize,
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
        // this.getInitialData({ query: submitData })
      }
    })
  }

  // 重置
  handleReset=() => {
    this.props.form.resetFields()
    // this.getInitialData({})
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator },
    } = this.props
    return (
      <Card title="例子" bordered={false} className={style.schoolLibrary}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="国家/地区">
            {getFieldDecorator('name3')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="院校中文名">
            {getFieldDecorator('name1')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="院校英文名">
            {getFieldDecorator('name2')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/school-library/add')}>新增</Button>
        <Table
          rowKey="id"
          dataSource={listData}
          // loading={loading}
          pagination={pagination}
          columns={this.columns}
          onChange={this.tableChange}
        />
      </Card>
    )
  }
}

export default Example
