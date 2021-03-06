import React, { Component, Fragment } from 'react'
import {
  Card, Table, Form, Input, Select, Button,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import moment from 'moment'
import SearchFilter from '@/components/SearchFilter'
import style from './style.less'
import OperateTreeNodeForm from './components/operateTreeNode/operateTreeNode'


const { Option } = Select
@Form.create()
@connect(({ note, loading }) => ({ ...note, loading: loading.effects['note/getListData'] }))
class Note extends Component {
  columns = [
    {
      title: '发布账号',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
    },
    {
      title: '笔记标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '点赞数',
      dataIndex: 'starCount',
      key: 'starCount',
      ellipsis: true,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      key: 'commentCount',
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '审核状态',
      dataIndex: 'statusName',
      key: 'statusName',
      ellipsis: true,
    },
    {
      title: '是否置顶',
      dataIndex: 'pinned',
      key: 'pinned',
      ellipsis: true,
      render:pinned=>pinned?'是':'否'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Fragment>
          <Button type="link" onClick={() => router.push(`/discover-manage/note/check/${id}`)}>审核</Button>
        </Fragment>
      ),
    },
  ]

  state={
    selectedRowKeys: [],
    isShowModal: false, // modal显影
  }

  componentDidMount() {
    this.getInitialData({})
    this.props.dispatch({ type: 'note/getApplyStatus',})
  }

  getInitialData=({ pageNumber = 1, pageSize = 10 ,query={}}) => {
    this.props.dispatch({
      type: 'note/getListData',
      params: {
        pageNumber,
        pageSize,
        ...query
      },
    })
  }

  // 表格change事件
  tableChange = ({ current, pageSize }) => {
    this.getInitialData({ pageNumber: current, pageSize })
  }

  // 搜索
  handleSearch=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const query ={}
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

  //勾选多选框
  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
//删除
  deleteNoteList = () =>{
    this.props.dispatch({
      type: 'note/deleteNote',
      params: {
        ids:this.state.selectedRowKeys,
      },
      cb:()=>this.getInitialData({})
    })
  }

  // 获取表单ref
  handleSaveOperateTreeNodeRef = (formRef) => {
    this.operateTreeNodeRef = formRef
  }
    // 切换Modal框显影
    handleToggleModalVisible = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }))
  }

  // Modal确认事件
  handleModalConfirm = () => {
    const { form } = this.operateTreeNodeRef.props
    const { selectedRowKeys } = this.state
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ 
          type: 'note/pinnedNote',
           params: { ...values,ids:selectedRowKeys},
           cb:()=>{
             this.getInitialData({query:this.props.query})
             this.setState({selectedRowKeys:[]})
      } })
        this.handleToggleModalVisible()
        form.resetFields()
      }
    })
  }

  // Modal取消事件
  handleModalCancel = () => {
    this.handleToggleModalVisible()
    this.operateTreeNodeRef.props.form.resetFields()
  }

  //时间选择
  timeSelect=(time)=>{
      this.props.dispatch({type:'note/getUsersList',params:{
        time
      }})
  }

  render() {
    const {
      loading, listData, pagination,applyStatusList,userList, form: { getFieldDecorator },
    } = this.props
    const {selectedRowKeys,isShowModal } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <Card title="笔记管理" bordered={false} className={style.note}>
        <SearchFilter handleSearch={this.handleSearch} handleReset={this.handleReset} span={8}>
        <Form.Item label="时间">
            {getFieldDecorator('time')(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
                onSelect={this.timeSelect}
              >
                <Option key={1} value={moment().valueOf()}>今天</Option>
                <Option key={2} value={moment().subtract(3, 'days').valueOf()}>近三日</Option>
                <Option key={3} value={moment().subtract(7, 'days').valueOf()}>本周</Option>
                <Option key={4} value={moment().subtract(1, 'months').valueOf()}>本月</Option>
                <Option key={4} value={moment().subtract(3, 'months').valueOf()}>近三月</Option>
                <Option key={4} value={moment().subtract(6, 'months').valueOf()}>半年</Option>
                <Option key={4} value={moment().subtract(1, 'years').valueOf()}>一年</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="用户">
            {getFieldDecorator('userId')(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
               {userList.map((item,key)=><Option key={key} value={item.id}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
        <Form.Item label="审核状态">
            {getFieldDecorator('statusId')(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
               {applyStatusList.map((item,key)=><Option key={key} value={item.id}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="关键字">
            {getFieldDecorator('query')(
              <Input maxLength={30} placeholder="请输入" />,
            )}
          </Form.Item>
         
        </SearchFilter>
        <Button disabled={!selectedRowKeys.length} type="primary" style={{ marginBottom: 10 }} onClick={this.handleToggleModalVisible}>置顶</Button>
        <Button disabled={!selectedRowKeys.length} type="primary" style={{ marginBottom: 10,marginLeft:20 }} onClick={this.deleteNoteList}>删除</Button>
        <Table
          rowKey="id"
          dataSource={listData}
          // loading={loading}
          pagination={pagination}
          columns={this.columns}
          onChange={this.tableChange}
          rowSelection={rowSelection}
        />
        <OperateTreeNodeForm
              // type={this.type}
              // data={data}
              visible={isShowModal}
              wrappedComponentRef={this.handleSaveOperateTreeNodeRef}
              onCancel={this.handleModalCancel}
              onConfirm={this.handleModalConfirm}
            />
      </Card>
    )
  }
}

export default Note
