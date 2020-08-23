import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button,Icon,Modal
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import style from './style.less'

const { Option } = Select
@Form.create()
@connect(({ feedback, loading }) => ({ ...feedback, loading: loading.effects['feedback/getListData'] }))
class Feedback extends Component {
  columns = [
    {
      title: '附件',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      width:100,
      render:id=><Button onClick={()=>this.getEnclosureList(id)} type='link'><Icon type="link" /></Button>
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
      ellipsis: true,
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '反馈时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '反馈处理',
      dataIndex: 'processContent',
      key: 'processContent',
      ellipsis: true,
      render:processContent=>processContent||'--'
    },
    {
      title: '处理时间',
      dataIndex: 'processTime',
      key: 'processTime',
      ellipsis: true,
      render:processTime=>processTime||'暂未处理'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/school-library/edit/${id}`)}>处理意见</Button>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    this.getInitialData({})
  }

  //获取列表
  getInitialData=({ pageNumber = 1, pageSize = 10,query={} }) => {
    this.props.dispatch({
      type: 'feedback/getListData',
      params: {
        pageNumber,
        pageSize,
        ...query
      },
    })
  }

  //获取附件
  getEnclosureList=async(id)=>{
   await this.props.dispatch({
      type: 'feedback/getEnclosureList',
      params: {
        id
      },
    })
    const {enclosureList} = this.props
    Modal.info({
      title: '附件',
      content: (
        <div>
          {enclosureList.map((item,key)=><p key={key}>
            <img width={280} height={250} style={{marginBottom:5}} src={item}/>
          </p>)||'暂无附件'}
        </div>
      ),
      onOk() {},
    })
  
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    this.getInitialData({ pageNumber: current, pageSize,query:this.props.query })
  }

  // 搜索
  handleSearch=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const query = {}
        Object.keys(values).forEach((key) => {
          if (values[key] !== undefined && values[key] !== '') { // 无该条件就不传该字段
            query[key] = values[key]
          }
        })
        this.getInitialData({ query })
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
      <Card title="例子" bordered={false} className={style.feedback}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
          <Form.Item label="时间">
            {getFieldDecorator('name3')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
        </SearchFilter>
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

export default Feedback
