import React, { Component } from 'react'
import {
  Card, Tree, Menu, Icon, Alert,
} from 'antd'
import { connect } from 'dva'
import Employee from './page-component/employee/employee'
import OperateTreeNodeForm from './page-component/operateTreeNode/operateTreeNode'
import style from './style.less'

const { TreeNode } = Tree

@connect(({ group }) => ({ ...group }))
class Group extends Component {
  state = {
    data: '', // 传给modal的数据
    isShowModal: false, // modal显影
  }

  type = null // 1:添加 2:编辑 3:删除

  componentDidMount() {
    this.getTreeData()
  }

  componentWillUnmount(){
    this.props.dispatch({ type: 'group/clearAll' })
  }

  //获取树节点
  getTreeData=()=>{
    this.props.dispatch({ type: 'group/getTreeNodeData',params:{} })
  }

  onSelect = (selectedKeys, { selected }) => {
    if (selected) {
      const categoryId = parseInt(selectedKeys[0], 10)
      this.props.dispatch({ type: 'group/getGroupList', params: { pageNum: 1, pageSize: 10, categoryId } })
      this.props.dispatch({ type: 'group/save', payload: { currentDeptId: categoryId } })
    }
  }

   // 获取表单ref
   handleSaveOperateTreeNodeRef = (formRef) => {
    this.operateTreeNodeRef = formRef
  }

  // 渲染树结构
  renderTreeNodes = data => data.map((item) => {
    return (
      <TreeNode
        key={item.id}
        title={
        <span title={item.name} style={{position:'relative'}}>
          {item.name}
          <span  onClick={()=>this.handleEditNode(item)} style={{position:'absolute',right:-30,color:'#1890FF'}}><Icon type="edit" /></span>
          <span  onClick={()=>this.handleDeleteNode(item.id)} style={{position:'absolute',right:-50,color:'#1890FF'}}><Icon type="delete" /></span>
          </span>}
        value={item.id}
        dataRef={item}
      />
    )
  })

    // 切换Modal框显影
    handleToggleModalVisible = () => {
      this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }))
    }

  // Modal确认事件
  handleModalConfirm = () => {
    const { form } = this.operateTreeNodeRef.props
    const { data: { id } } = this.state
    form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        if(this.type===1){
        this.props.dispatch({ type: 'group/addTreeNodeData', params: { ...values},cb:this.getTreeData })
        }else{
        this.props.dispatch({ type: 'group/editTreeNodeData', params: { ...values,needId:id},cb:this.getTreeData })
        }
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

   // 添加节点
   handleAddNode = () => {
    this.type = 1
    this.handleToggleModalVisible()
  }

  // 编辑节点 
  handleEditNode = (item) => {
    this.setState({data:item})
    this.type = 2
    this.handleToggleModalVisible()
  }

  // 删除节点
  handleDeleteNode = (id) => {
    this.props.dispatch({ type: 'group/deleteTreeNodeData', params: { needId:id },cb:this.getTreeData })
  }

  render() {
    const { isShowModal, data, rightClickMenu } = this.state
    const { treeData } = this.props

    return (
      <Card title="小组管理" bordered={false}>
        <div style={{ display: 'flex' }}>
          {/* 展示组小组分类 */}
          <div onClick={this.clearMenu} className={style.treeNodeArea}>
            <Alert type="info" showIcon message="可在此选择不同小组分类" />
            {/* 树结构 */}
            <div className={style.tree}>
              <Tree
                defaultExpandAll
                onSelect={this.onSelect}
                onRightClick={this.onRightClick}
              >
                {
                  treeData.length > 0 ? <TreeNode key="0" title={<span style={{position:'relative'}}>小组分类<span onClick={this.handleAddNode } style={{position:'absolute',right:-30,color:'#1890FF'}}><Icon type="file-add" /></span></span>}>{ this.renderTreeNodes(treeData)}</TreeNode> : <TreeNode key="0" title="企业" />
                }
              </Tree>
            </div>
            <OperateTreeNodeForm
              type={this.type}
              data={data}
              visible={isShowModal}
              wrappedComponentRef={this.handleSaveOperateTreeNodeRef}
              onCancel={this.handleModalCancel}
              onConfirm={this.handleModalConfirm}
            />
          </div>
          {/* 展示员工表格 */}
          <Employee />
        </div>
      </Card>
    )
  }
}

export default Group
