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
@connect(({ backgroundPromote, loading }) => ({ ...backgroundPromote, loading: loading.effects['backgroundPromote/getListData'] }))
class BackgroundPromote extends Component {
  columns = [
    {
      title: '背景提升项目标题',
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
      title: '适用专业',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: '适用年级',
      dataIndex: 'gradeName',
      key: 'gradeName',
      ellipsis: true,
    },
    {
      title: '含金量',
      dataIndex: 'gold',
      key: 'gold',
      ellipsis: true,
    },
    {
      title: '考试形式',
      dataIndex: 'examinationForm',
      key: 'examinationForm',
      ellipsis: true,
    },
    {
      title: '考试安排',
      dataIndex: 'examinationArrangement',
      key: 'examinationArrangement',
      ellipsis: true,
    },
    {
      title: '考试内容',
      dataIndex: 'examinationContent',
      key: 'examinationContent',
      ellipsis: true,
    },
    {
      title: '考试资源',
      dataIndex: 'examinationResource',
      key: 'examinationResource',
      ellipsis: true,
    },
    {
      title: '相关网站',
      dataIndex: 'website',
      key: 'website',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/resource-library/background-promote/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.props.dispatch({
      type: 'backgroundPromote/getGradeList',
    })
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'backgroundPromote/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'backgroundPromote/getListData',
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
      type: 'backgroundPromote/getDel',
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
      <Card title="背景提升库列表" bordered={false} className={style.backgroundPromote}>
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
              <Input maxLength={60} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
        <Row>
          <Col span={12}>
            <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/resource-library/background-promote/add')}>新增</Button>
          </Col>
          <Col span={12}>
            <MyUpload uploadType={'background'}/>
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

export default BackgroundPromote
