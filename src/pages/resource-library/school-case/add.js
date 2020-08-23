import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, DatePicker, Upload, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import Editor from '@/components/B-Editor'
import moment from 'moment'

// const { TextArea } = Input
const { Option } = Select
const routes = [
  {
    path: '/resource-library/school-case',
    breadcrumbName: '院校案例库管理',
  },
  {
    breadcrumbName: '新增院校案例',
  },
]
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}


@Form.create()
@connect(({ schoolCaseAdd }) => ({ ...schoolCaseAdd }))
class SchoolCaseAdd extends Component {
  state = { schoolName: '' }

  componentDidMount() {
    const { location: { query: { universityId, schoolName } } } = this.props
    this.setState({
      schoolName,
    })
    this.props.dispatch({
      type: 'schoolCaseAdd/getSelectData', params: { universityId },
    })
  }

  handleSubmit=(id) => {
    // moment(registrationStartTime).format('YYYY-MM-DD HH:mm:ss')
    const { form: { validateFields }, location: { query: { universityId } } } = this.props
    validateFields((errors, values) => {
      const { applyTime, description } = values
      if (!errors) {
        let { image } = values
        image = process.env.url + image[0].response.data.src
        this.props.dispatch({
          type: 'schoolCaseAdd/getAdd',
          params: {
            ...values,
            applyTime: moment(applyTime).format('YYYY-MM-DD HH:mm:ss'),
            description: description.toHTML(),
            image,
            id,
            universityId,
          },
        })
      }
    })
  }

  handleUploadImageEvent = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    if (e.file.status === 'done') {
      console.log(e.fileList)
      e.fileList.slice(-1)[0].url = e.file.response.data
    }
    return e && e.fileList.slice(-1)
  }

  // 图片格式校验
  handleBeforeUploadImg = file => new Promise((resolve, reject) => {
    const fileType = file.type
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      message.error('请上传PNG或者JPG文件')
      return reject(false)
    }
    return resolve(true)
  })

  // 禁止删除图片
  handleRemove = () => new Promise((resolve, reject) => reject(false))


  render() {
    const { form: { getFieldDecorator }, subjectList, degreeList } = this.props
    const { id } = this.props.match.params
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="当前选择院校">
            <h1>{this.state.schoolName}</h1>
          </Form.Item>

          <Form.Item label="图片" extra="请上传格式为.png或.jpg的图片">
            {getFieldDecorator('image', {
              valuePropName: 'fileList',
              getValueFromEvent: this.handleUploadImageEvent,
              rules: [{ required: true, message: '图片不能为空' }],
            })(
              <Upload
                showUploadList={{ showRemoveIcon: false, showDownloadIcon: false }}
                onRemove={this.handleRemove}
                name="file"
                listType="picture"
                action={process.env.upload}
                beforeUpload={this.handleBeforeUploadImg}
              >
                <Button icon="upload">上传图片</Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="申请专业">
            {getFieldDecorator('subjectId', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {subjectList.map(item => <Option value={item.id}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="申请人中文名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'name' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="英文名">
            {getFieldDecorator('nameEn', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="毕业院校">
            {getFieldDecorator('graduatedUniversity', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="毕业专业">
            {getFieldDecorator('graduatedSubject', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="毕业学位">
            {getFieldDecorator('graduatedDegree', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="申请学位">
            {getFieldDecorator('degreeId', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {degreeList.map(item => <Option value={item.id}>{item.name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="申请时间">
            {getFieldDecorator('applyTime', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <DatePicker style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item label="申请状态">
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Radio.Group>
                <Radio value="success">申请成功</Radio>
                <Radio value="processing">申请中</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="案例描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Editor placeholder="请输入" />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.handleSubmit(id)}>提交</Button>
            <Button onClick={() => { router.push('/resource-library/school-case') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolCaseAdd
