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
@connect(({ note }) => ({ ...note }))
class NoteModal extends Component {
  render() {
    const {
      visible, onCancel, onConfirm, form: { getFieldDecorator }, 
    } = this.props
    return (
      <Modal
        visible={visible}
        title='置顶'
        okText='确定'
        onCancel={onCancel}
        onOk={onConfirm}
      >
            <Form  {...formItemLayout}>
              <Form.Item label="置顶天数">
                {getFieldDecorator('day', {
                  rules: [{ required: true, whitespace: true, message: '置顶天数不能为空' }],
                })(
                  <Input placeholder="请输入置顶天数" maxLength={30} />,
                )}
              </Form.Item>
            </Form>
          
      </Modal>
    )
  }
}

export default NoteModal
