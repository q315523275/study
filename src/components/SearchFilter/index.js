import React, { PureComponent } from 'react'
import {
  Row, Col, Button, Form,
} from 'antd'
import styles from './style.less'


class SearchFilter extends PureComponent {
  render() {
    const {
      handleSearch, // 搜索事件
      handleReset, // 重置事件
      span = 8, // 每个item的长度
      children = [], // 子节点
      label = 6,
    } = this.props

    const formItemLayout = { // 表单布局
      labelCol: { span: label },
      wrapperCol: { span: 24 - label },
    }
    let childrenTemp = []
    if (children instanceof Array) {
      childrenTemp = childrenTemp.concat(children)
    } else {
      childrenTemp.push(children)
    }

    const childrenDom = childrenTemp.map((node, index) => (
      <Col lg={span} md={12} sm={24} key={index}>{node}</Col>
    ))
    return (
      <div className={styles.searchFilter}>
        <Form {...formItemLayout}>
          <Row>
            {childrenDom}
          </Row>
          <Row>
            <Col lg={span} md={12} sm={24}>
              <Form.Item wrapperCol={{ offset: label }} className={styles.btnItem}>
                <Button type="primary" icon="search" onClick={handleSearch}>查询</Button>
                <Button icon="reload" onClick={handleReset}>重置</Button>
                {this.props.moreBtn}
                {/*<Button*/}
                {/*  type="primary"*/}
                {/*  style={{ marginBottom: 10 }}*/}
                {/*  onClick={() => router.push('/school-library/add')}*/}
                {/*>新增员工*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*  type="primary"*/}
                {/*  style={{ marginBottom: 10 }}*/}
                {/*  // onClick={() => router.push('/school-library/add')}*/}
                {/*>重置密码*/}
                {/*</Button>*/}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default SearchFilter
