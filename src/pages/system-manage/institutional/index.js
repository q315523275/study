import React, { Component } from 'react'
import {
  Card, Tree, Menu, Icon, Alert,
} from 'antd'
import { connect } from 'dva'
import Employee from './page-component/employee/employee'
import style from './style.less'

const { TreeNode } = Tree

@connect(({ institutional }) => ({ ...institutional }))
class SchoolDomain extends Component {
  componentDidMount() {
    console.log(this.props)
    this.getTreeData()
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'schoolDomain/clearAll' })
  }

  // 获取树节点
  getTreeData=() => {
    this.props.dispatch({
      type: 'institutional/getListData',
      params: {},
    })
  }

  onSelect = (selectedKeys, { selected }) => {
    if (selected) {
      const universityId = parseInt(selectedKeys[0], 10)
      this.props.dispatch({ type: 'schoolDomain/getUniversitySubjectList', params: { pageNum: 1, pageSize: 10, universityId } })
      this.props.dispatch({ type: 'schoolDomain/save', payload: { universityId } })
    }
  }

   // 获取表单ref
   handleSaveOperateTreeNodeRef = (formRef) => {
     this.operateTreeNodeRef = formRef
   }

  // 渲染树结构
  renderTreeNodes = data => data.map(item => (
    <TreeNode
      key={item.id}
      title={item.name}
      value={item.id}
      dataRef={item}
      selectable={false}
    >
      {
          item.children.map(cItem => (
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
    console.log(treeData)
    return (
      <Card title="组织机构" bordered={false}>
        <div style={{ display: 'flex' }}>
          {/* 展示组院校专业库分类 */}
          <div onClick={this.clearMenu} className={style.treeNodeArea}>
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
          <Employee />
        </div>
      </Card>
    )
  }
}

export default SchoolDomain
