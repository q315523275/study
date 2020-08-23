import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Button, Breadcrumb,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import style from './style.less'

const routes = [
  {
    path: '/resource-library/school-domain',
    breadcrumbName: '院校专业库管理',
  },
  {
    breadcrumbName: '新增院校专业',
  },
]
@Form.create()
@connect(({ schoolDomainAdd, loading }) => ({ ...schoolDomainAdd, loading: loading.effects['schoolDomainAdd/getListData'] }))
class SchoolDomainAdd extends Component {
  columns = [
    {
      title: '专业编码',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '专业分类',
      dataIndex: 'dic',
      key: 'dic',
      ellipsis: true,
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
  ]

  state={
    selectedRowKeys: [],
  }

  componentDidMount() {
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'schoolDomainAdd/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10 }) => {
    const { location: { query: { universityId } } } = this.props
    this.props.dispatch({
      type: 'schoolDomainAdd/getSubjectCanAdd',
      params: {
        pageNumber,
        pageSize,
        universityId,
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    const { query } = this.props
    this.getInitialData({ pageNumber: current, pageSize })
  }

  getAdd=() => {
    const { selectedRowKeys } = this.state
    const { location: { query: { universityId } } } = this.props
    this.props.dispatch({
      type: 'schoolDomainAdd/getAdd',
      params: {
        ids: selectedRowKeys,
        universityId,
      },
    })
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const {
      loading, subjectList, pagination, form: { getFieldDecorator }, countryList, location: { query: { universityId } },
    } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
        className={style.schoolDomainAdd}
      >
        <Button type="primary" style={{ marginBottom: 10 }} disabled={!selectedRowKeys.length} onClick={this.getAdd}>添加</Button>
        <Table
          rowKey="id"
          dataSource={subjectList}
          loading={loading}
          pagination={pagination}
          columns={this.columns}
          onChange={this.tableChange}
          rowSelection={rowSelection}
        />
      </Card>
    )
  }
}

export default SchoolDomainAdd
