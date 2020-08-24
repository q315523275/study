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
@connect(({ employeesAccount, loading }) => ({
  ...employeesAccount,
  loading: loading.effects['employeesAccount/getListData'],
}))
class Example extends Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
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
    {
      title: '员工账户',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
    },
    {
      title: '员工姓名',
      dataIndex: 'nickName',
      key: 'nickName',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'sexId',
      key: 'sexId',
      ellipsis: true,
      render: sexId => (sexId === 100012 ? '男' : '女'),
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      ellipsis: true,
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: '用户状态',
      dataIndex: 'locked',
      key: 'locked',
      ellipsis: true,
      render: locked => (locked ? '锁定' : '激活'),
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  getInitialData=({ pageNum = 1, pageSize = 10 }) => {
    this.props.dispatch({
      type: 'employeesAccount/getListData',
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
    console.log(listData)
    return (
      <Card title="员工账号管理" bordered={false} className={style.schoolLibrary}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="员工账号">
            {getFieldDecorator('name3')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="员工姓名">
            {getFieldDecorator('name1')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="部门名称">
            {getFieldDecorator('name2')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
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
