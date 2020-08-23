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
@connect(({ informationPublish, loading }) => ({ ...informationPublish, loading: loading.effects['informationPublish/getListData'] }))
class InformationPublish extends Component {
  columns = [
    {
      title: '模块名称',
      dataIndex: 'moduleName',
      key: 'moduleName',
      ellipsis: true,
    },
    {
      title: '栏目名称',
      dataIndex: 'itemName',
      key: 'itemName',
      ellipsis: true,
    },
    {
      title: '子栏目',
      dataIndex: 'subItemName',
      key: 'subItemName',
      ellipsis: true,
      render: subItemName => subItemName||'--',
    },
    {
      title: '记录',
      dataIndex: 'resourceObj',
      key: 'resourceObj',
      ellipsis: true,
      render: resourceObj => resourceObj?resourceObj.name:'--',
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      ellipsis: true,
    },
    {
      title: '信息状态',
      dataIndex: 'publishStatusName',
      key: 'publishStatusName',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'publishStatus',
      key: 'publishStatus',
      width: 200,
      render: (_, { publishStatus, id }) => (publishStatus ? (
        <Fragment>
          <Button size="small" style={{ marginRight: 10 }} onClick={() => this.unPublish(id)} type="link">取消发布</Button>
          <Button size="small" style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button size="small" type="link" onClick={() => this.publish(id)}>发布</Button>
          <Button size="small" type="link" onClick={() => router.push(`/message-manage/information-publish/edit/${id}`)}>编辑</Button>
          <Button size="small" style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      )),
    },
  ]

  componentDidMount() {
    this.props.dispatch({
      type: 'informationPublish/getCountryList',
    })
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'informationPublish/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'informationPublish/getListData',
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
      type: 'informationPublish/getDel',
      params: {
        needId,
      },
      cb: () => this.getInitialData({}),
    })
  }

  // 取消发布
  publish=(needId) => {
    this.props.dispatch({
      type: 'informationPublish/getPublish',
      params: {
        needId,
        needEnd: '/publish',
      },
      cb: () => this.getInitialData({}),
    })
  }

  // 取消发布
  unPublish=(needId) => {
    this.props.dispatch({
      type: 'informationPublish/getUnPublish',
      params: {
        needId,
        needEnd: '/un_publish',
      },
      cb: () => this.getInitialData({}),
    })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator },
    } = this.props
    console.log(listData)
    return (
      <Card title="信息维护库列表" bordered={false} className={style.informationPublish}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/message-manage/information-publish/add')}>新增</Button>
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

export default InformationPublish
