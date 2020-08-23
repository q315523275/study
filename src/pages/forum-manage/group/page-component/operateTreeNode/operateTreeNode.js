import React, { Component } from 'react'
import { Modal, Form, Input,Radio } from 'antd'
import { connect } from 'dva'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

@Form.create()
@connect(({ organization }) => ({ ...organization }))
class OperateTreeNode extends Component {
  // 文案切换显示
  showText = (key) => {
    const tmp = {}
    switch (key) {
      case 1:
        tmp.title = '添加分类'
        tmp.okText = '添加'
        break
      case 2:
        tmp.title = '编辑分类'
        tmp.okText = '保存'
        break
      default:
        tmp.title = '删除分类'
        tmp.okText = '删除'
    }
    return tmp
  }

  render() {
    const {
      visible, onCancel, onConfirm, data, form: { getFieldDecorator }, type,
    } = this.props
    const { title, okText } = this.showText(type)
    return (
      <Modal
        visible={visible}
        title={title}
        okText={okText}
        onCancel={onCancel}
        onOk={onConfirm}
      >
        {
            (type === 1 || type === 2) && (
            <Form  {...formItemLayout}>
              <Form.Item label="分类名称">
                {getFieldDecorator('name', {
                  initialValue: type === 2 ? data.name : undefined,
                  rules: [{ required: true, whitespace: true, message: '分类名称不能为空' }],
                })(
                  <Input placeholder="请输入分类名称" maxLength={30} />,
                )}
              </Form.Item>
              <Form.Item label="是否启用">
                {getFieldDecorator('enable', {
                  initialValue: type === 2 ? data.enable : undefined,
                  rules: [{ required: true, message: '请选择' }],
                })(
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </Form>
          )
        }
      </Modal>
    )
  }
}

export default OperateTreeNode
