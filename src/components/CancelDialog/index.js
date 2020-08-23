import React from 'react'
import { Modal, Form, Input } from 'antd'

const { TextArea } = Input
class CollectionCreateForm extends React.Component {
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        // mask={false}
        visible={visible}
        title="原因"
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <Form.Item>
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: '请填写不通过原因',
                },
              ],
            })(<TextArea maxLength={100} placeholder="请填写不通过原因" rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create({ name: 'CollectionCreateForm' })(
  CollectionCreateForm,
)
