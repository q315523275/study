import React, { Component } from 'react'
import {
  Card, Tree, Menu, Icon, Alert,
} from 'antd'
import { connect } from 'dva'
import Employee from './page-component/employee/employee'
import OperateTreeNodeForm from './page-component/operateTreeNode/operateTreeNode'
import style from './style.less'

const { TreeNode } = Tree

@connect(({ organization }) => ({ ...organization }))
class Index extends Component {
  state = {
    data: '', // 传给modal的数据
    isShowModal: false, // modal显影
    rightClickMenu: null, // 右键菜单
  }

  type = null // 1:添加 2:编辑 3:删除

  componentDidMount() {
    this.props.dispatch({ type: 'organization/getTreeNodeData' })
  }

  onSelect = (selectedKeys, { selected }) => {
    if (selected) {
      const deptId = parseInt(selectedKeys[0], 10)
      this.props.dispatch({ type: 'organization/getAccountList', params: { pageNum: 1, pageSize: 10, deptId } })
      this.props.dispatch({ type: 'organization/save', payload: { currentDeptId: deptId } })
    }
  }

  onRightClick = ({ event, node }) => {
    this.clearMenu()
    this.setState({
      data: {
        id: node.props.eventKey,
        name: node.props.title,
      },
      rightClickMenu: {
        pageX: event.pageX,
        pageY: event.pageY,
        posLength: node.props.pos.split('-').length,
        masterId: node.props.dataRef ? node.props.dataRef.masterId : '0',
        isDelete: !!node.props.children,
        isDefault: node.props.title === '默认部门',
      },
    })
  }


  // 渲染树结构
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode
          title={item.name}
          key={item.id}
          value={item.id}
          dataRef={item}
        >
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return (
      <TreeNode
        key={item.id}
        title={item.name}
        value={item.id}
        dataRef={item}
      />
    )
  })

  // Modal确认事件
  handleModalConfirm = () => {
    const { form } = this.operateTreeNodeRef.props
    const { data: { id } } = this.state
    form.validateFields((err, { name }) => {
      if (!err) {
        this.props.dispatch({ type: 'organization/operateTreeNode', params: { id, name, type: this.type } })
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

  render() {
    const { isShowModal, data, rightClickMenu } = this.state
    const { treeData } = this.props

    return (
      <Card title="子账号列表" bordered={false}>
        <div style={{ display: 'flex' }}>
          {/* 展示组织架构图 */}
          <div onClick={this.clearMenu} className={style.treeNodeArea}>
            <Alert type="info" showIcon message="可在此选择不同国家的大学" />
            {/* 树结构 */}
            <div className={style.tree}>
              <Tree
                defaultExpandAll
                onSelect={this.onSelect}
                onRightClick={this.onRightClick}
              >
                {
                  treeData.length > 0 ? <TreeNode key="0" title="企业">{ this.renderTreeNodes(treeData)}</TreeNode> : <TreeNode key="0" title="企业" />
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

export default Index
