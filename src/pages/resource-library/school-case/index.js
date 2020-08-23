import React, { Component } from 'react'
import {
  Card, Tree, Menu, Icon, Alert,
} from 'antd'
import { connect } from 'dva'
import Employee from './page-component/employee/employee'
import style from './style.less'

const { TreeNode } = Tree

@connect(({ schoolCase }) => ({ ...schoolCase }))
class SchoolCase extends Component {
  schoolName = ''
  componentDidMount() {
    this.getTreeData()
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'schoolCase/clearAll' })
  }

  // 获取树节点
  getTreeData=() => {
    this.props.dispatch({ type: 'schoolCase/getTreeNodeData', params: {} })
  }

  onSelect = (selectedKeys, { selected, selectedNodes }) => {
    if (selected) {
      this.schoolName = selectedNodes[0].props.title
      const universityId = parseInt(selectedKeys[0], 10)
      this.props.dispatch({ type: 'schoolCase/getUniversityCaseList', params: { pageNum: 1, pageSize: 10, universityId } })
      this.props.dispatch({ type: 'schoolCase/save', payload: { universityId } })
    }
  }

   // 获取表单ref
   handleSaveOperateTreeNodeRef = (formRef) => {
     this.operateTreeNodeRef = formRef
   }

  // 渲染树结构
  renderTreeNodes = data => data.map(item => (
    <TreeNode
      key={item.countryId}
      title={item.countryName}
      value={item.countryId}
      dataRef={item}
      selectable={false}
    >
      {
          item.items.map(cItem => (
            <TreeNode
              key={cItem.id}
              title={cItem.name}
              value={cItem.id}
              dataRef={cItem}
            />
          ))
        }
    </TreeNode>
  ))

  render() {
    const { treeData } = this.props

    return (
      <Card title="院校案例库管理" bordered={false}>
        <div style={{ display: 'flex' }}>
          {/* 展示组院校专业库分类 */}
          <div onClick={this.clearMenu} className={style.treeNodeArea}>
            <Alert type="info" showIcon message="请选择国家院校" />
            {/* 树结构 */}
            <div className={style.tree}>
              <Tree
                defaultExpandAll
                onSelect={this.onSelect}
              >
                {
                  treeData.length > 0 ? this.renderTreeNodes(treeData) : <TreeNode key="0" title="企业" />
                }
              </Tree>
            </div>
          </div>
          {/* 展示员工表格 */}
          <Employee schoolName={this.schoolName}/>
        </div>
      </Card>
    )
  }
}

export default SchoolCase
