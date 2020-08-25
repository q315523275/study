import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button, message, DatePicker,
} from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import SearchFilter from '@/components/SearchFilter'
import style from './style.less'


const { RangePicker } = DatePicker
@Form.create()
@connect(({ log, loading }) => ({
  ...log,
  loading: loading.effects['log/getListData'],
}))
class Example extends Component {
  state = {
    selectedRowKeys: [],
  }

  columns = [
    {
      title: '日志内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },

    {
      title: '用户编号',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户姓名',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '日志类型',
      dataIndex: 'operationTypeName',
      key: 'operationTypeName',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '访问IP',
      dataIndex: 'ip',
      key: 'ip',
      ellipsis: true,
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  getInitialData=({
    pageNum = 1, pageSize = 10, query = '', type = '', start = '', end = '',
  }) => {
    this.props.dispatch({
      type: 'log/getListData',
      params: {
        pageNum,
        pageSize,
        type,
        query,
        start,
        end
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    this.getInitialData({ pageNum: current, pageSize })
  }

  // 搜索
  handleSearch=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const submitData = {}
        Object.keys(values).forEach((key) => {
          if (values[key] !== undefined && values[key] !== '') { // 无该条件就不传该字段
            if (values.time.length > 0) {
              submitData.start = moment(values.time[0]).valueOf()
              submitData.end = moment(values.time[1]).valueOf()
            }
            submitData[key] = values[key]
          }
        })
        console.log(submitData)

        this.getInitialData({ ...submitData })
      }
    })
  }

  // 重置
  handleReset=() => {
    this.props.form.resetFields()
    this.getInitialData({})
  }


  deleteDataFn = () => {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      message.info('请选择项目')
      return
    }
    this.props.dispatch({
      type: 'log/deleteData',
      params: { ids: selectedRowKeys },
      cb: this.handleReset,
    })
  }

  // 勾选多选框
  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator }, operType,
    } = this.props
    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card title="日志管理" bordered={false} className={style.schoolLibrary}>
        <SearchFilter
          moreBtn={<Button type="danger" onClick={this.deleteDataFn}>删除</Button>
          }
          handleSearch={this.handleSearch}
          handleReset={this.handleReset}
          span={8}
        >
          <Form.Item label="用户姓名">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="日志类型">
            {getFieldDecorator('type')(
              <Select onChange={type => console.log(type)}>
                {operType.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="时间">
            {getFieldDecorator('time')(
              <RangePicker
                onChange={
                e => console.log(moment(e[0]).valueOf())
              }
              />,
              // <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Table
          rowKey="id"
          dataSource={listData}
          loading={loading}
          pagination={pagination}
          rowSelection={rowSelection}
          columns={this.columns}
          onChange={this.tableChange}
        />
      </Card>
    )
  }
}

export default Example
