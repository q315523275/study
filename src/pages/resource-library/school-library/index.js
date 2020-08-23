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
@connect(({ schoolLibrary, loading }) => ({ ...schoolLibrary, loading: loading.effects['schoolLibrary/getListData'] }))
class SchoolLibrary extends Component {
  columns = [
    {
      title: '推荐至首页',
      dataIndex: 'hot',
      key: 'hot',
      render: hot => (hot ? '是' : '否'),
    },
    {
      title: '院校中文名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '院校英文名',
      dataIndex: 'nameEn',
      key: 'nameEn',
      ellipsis: true,
    },
    {
      title: '所属国家',
      dataIndex: 'countryId',
      key: 'countryId',
      ellipsis: true,
      render: (countryId) => {
        const { countryListJson } = this.props
        return countryListJson[countryId] && countryListJson[countryId].countryName
      },
    },
    {
      title: '院校地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
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
      title: '年花费',
      dataIndex: 'tuition',
      key: 'tuition',
      ellipsis: true,
    },
    {
      title: '平均录取率',
      dataIndex: 'admission',
      key: 'admission',
      ellipsis: true,
    },
    {
      title: '学校网址',
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
          <Button type="link" onClick={() => router.push(`/resource-library/school-library/edit/${id}`)}>编辑</Button>
          <Button style={{ marginRight: 10 }} disabled={this.state.selectedRowKeys.length} onClick={() => this.delData(id)} type="link">删除</Button>
        </Fragment>
      ),
    },
  ]

  state={
    selectedRowKeys: [],
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'schoolLibrary/getCountryList',
    })
    this.getInitialData({})
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'schoolLibrary/clearAll' })
  }

  getInitialData=({ pageNumber = 1, pageSize = 10, query = {} }) => {
    this.props.dispatch({
      type: 'schoolLibrary/getListData',
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
      type: 'schoolLibrary/getDel',
      params: {
        needId,
      },
      cb: () => this.getInitialData({}),
    })
  }

  // 删除多个
  delArr=() => {
    const { selectedRowKeys } = this.state
    this.props.dispatch({
      type: 'schoolLibrary/getDelArr',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({}),
    })
  }


  painedFn = () => {
    const { selectedRowKeys } = this.state
    if (selectedRowKeys.length === 0) {
      message.info('请勾选')
      return
    }
    this.props.dispatch({
      type: 'schoolLibrary/pained',
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
      type: 'schoolLibrary/unpained',
      params: {
        ids: selectedRowKeys,
      },
      cb: () => this.getInitialData({}),
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const {
      loading, listData, pagination, form: { getFieldDecorator }, countryList,
    } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card title="院校库列表" bordered={false} className={style.schoolLibrary}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="国家/地区">
            {getFieldDecorator('countryId')(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {countryList.map(({ countryId, countryName }, key) => <Option key={key} value={countryId}>{countryName}</Option>)}
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
            <Button type="primary" style={{ marginBottom: 10 }} onClick={() => router.push('/resource-library/school-library/add')}>新增</Button>
            <Button type="primary" disabled={!selectedRowKeys.length} style={{ margin: '0 0 10px 10px' }} onClick={this.delArr}>删除</Button>
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
            <MyUpload uploadType="university" />
          </Col>
        </Row>
        <Table
          rowKey="id"
          dataSource={listData}
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

export default SchoolLibrary
