import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button,Row,Col
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import MyUpload from '@/components/my-upload'
import style from './style.less'

const { Option } = Select
@Form.create()
@connect(({ summerProject, loading }) => ({ ...summerProject, loading: loading.effects['summerProject/getListData'] }))
class SummerProject extends Component {
  columns = [
    {
      title: '暑期项目标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '项目描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '适用年级',
      dataIndex: 'gradeName',
      key: 'gradeName',
      ellipsis: true,
    },
    {
      title: '项目预期成果',
      dataIndex: 'expectedResult',
      key: 'expectedResult',
      ellipsis: true,
      render:expectedResult=>expectedResult||'--'
    },
    {
      title: '活动时间',
      dataIndex: 'activeStartTime',
      key: 'activeStartTime',
      ellipsis: true,
    },
    {
      title: '活动地点',
      dataIndex: 'place',
      key: 'place',
      ellipsis: true,
    },
    {
      title: '项目状态',
      dataIndex: 'statusName',
      key: 'statusName',
      ellipsis: true,
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
          <Button type="link" onClick={() => router.push(`/resource-library/summer-project/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.props.dispatch({
      type: 'summerProject/getGradeList',
    })
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'summerProject/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'summerProject/getListData',
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
      type: 'summerProject/getDel',
      params: {
        needId,
      },
      cb: () => this.getInitialData({}),
    })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator }, gradeList,
    } = this.props
    return (
      <Card title="暑期项目库列表" bordered={false} className={style.summerProject}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="适用年级">
            {getFieldDecorator('gradeId')(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {gradeList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Row>
          <Col span={12}>
            <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/resource-library/summer-project/add')}>新增</Button>
          </Col>
          <Col span={12}>
            <MyUpload uploadType={'summerProject'}/>
          </Col>
        </Row>
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

export default SummerProject
