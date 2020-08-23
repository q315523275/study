import React, { Component } from 'react'
import {
  Modal, Form, Input, TreeSelect, Select,
} from 'antd'
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

const { TreeNode } = TreeSelect
const { Option } = Select
@Form.create()
@connect(({ group }) => ({ ...group }))
class OperateMember extends Component {
  // 获取数结构的初始值
  getTreeInitialValue = (type) => {
    const { currentDeptId, childUserInfo: { deptId } } = this.props
    if (type === 1) {
      if (currentDeptId === 0) { return undefined }
      return currentDeptId.toString()
    }
    if (deptId) {
      return deptId.toString()
    }
    return undefined
  }

  handleChange=(value) => {
    console.log(`selected ${value}`)
  }

  render() {
    const {
      visible, onCancel, onConfirm, type, form: { getFieldDecorator },
    } = this.props
    // const {
    //   contacts, contactsPhone, address, idCard, gender,
    // } = this.props.childUserInfo
    return (
      <Modal
        visible={visible}
        title={type === 1 ? '添加子账号' : '编辑子账号'}
        okText={type === 1 ? '添加' : '保存'}
        onCancel={onCancel}
        onOk={onConfirm}
      >
        <Form {...formItemLayout}>
          {
            type === 1 && (
              <Form.Item label="用户名">
                {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: '用户名不能为空' },
                    {
                      pattern: /^[a-zA-Z0-9_-]{6,20}$/,
                      message: '用户名格式为6-20位可包含字母，数字，“_”，“-”',
                    },
                  ],
                })(
                  <Input placeholder="用户名格式为6-20位可包含字母，数字" />,
                )}
              </Form.Item>
            )
          }
          <Form.Item label="姓名">
            {getFieldDecorator('contacts', {
              initialValue: type === 2 ? contacts : undefined,
              rules: [{ required: true, message: '姓名不能为空' },
                {
                  pattern: /^[\u4E00-\u9FA5]+$/,
                  message: '仅支持输入中文',
                }],
            })(
              <Input placeholder="请输入身份证姓名" maxLength={50} />,
            )}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator('idCard', {
              initialValue: type === 2 ? idCard : undefined,
              rules: [{ required: true, message: '身份证号不能为空' },
                {
                  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                  message: '身份证号不合法',
                }],
            })(
              <Input placeholder="请输入身份证号" maxLength={20} />,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: type === 2 ? gender : undefined,
              rules: [{ required: true, message: '性别不能为空' }],
            })(
              <Select
                style={{ width: '100%' }}
                onChange={this.handleChange}
                placeholder="请选择性别"
              >
                <Option key={1} value={1}>男</Option>
                <Option key={2} value={2}>女</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('address', {
              initialValue: type === 2 ? address : undefined,
              rules: [{ required: true, message: '地址不能为空' }],
            })(
              <Input placeholder="请输入地址" maxLength={50} />,
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('contactsPhone', {
              initialValue: type === 2 ? contactsPhone : undefined,
              rules: [{ required: true, message: '手机号码不能为空' }, { pattern: /^(1[3456789]\d{9})$/, message: '手机号码格式不正确' }],
            })(
              <Input placeholder="请输入手机号" />,
            )}
          </Form.Item>
          {
            type === 1 && (
              <Form.Item label="密码">
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '密码不能为空' },
                      {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/, message: '密码格式为6-10位只能由数字和字母组成',
                      },
                    ],
                  })(<Input maxLength={10} placeholder="请输入密码" />)}
              </Form.Item>
            )
          }
        </Form>
      </Modal>
    )
  }
}

export default OperateMember
