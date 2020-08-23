import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Select, Checkbox, DatePicker, Upload, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import BraftEditor from 'braft-editor'
import Editor from '@/components/B-Editor'
import moment from 'moment'
import PageLoading from '@/components/PageLoading'

const { TextArea } = Input
const { Option } = Select
const routes = [
  {
    path: '/resource-library/summer-project',
    breadcrumbName: '暑期项目库管理',
  },
  {
    breadcrumbName: '新增暑期项目库',
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
@connect(({ summerProjectEdit }) => ({ ...summerProjectEdit }))
class SummerProjectEdit extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'summerProjectEdit/getDetail', params: { id: this.props.match.params.id } })
    this.props.dispatch({ type: 'summerProjectEdit/getSelectList' })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        const {
          content, registrationStartTime, registrationEndTime, activeStartTime, activeEndTime,image,
        } = values
        const LENGTH = content.toHTML().length // 富文本的长度
        if (LENGTH === 7) {
          message.error('信息内容不能为空')
          return
        }
        this.props.dispatch({
          type: 'summerProjectEdit/getEdit',
          params: {
            ...values,
            id: this.props.initData.id,
            content: content.toHTML(),
            registrationStartTime: moment(registrationStartTime).format('YYYY-MM-DD HH:mm:ss'),
            registrationEndTime: moment(registrationEndTime).format('YYYY-MM-DD HH:mm:ss'),
            activeStartTime: moment(activeStartTime).format('YYYY-MM-DD HH:mm:ss'),
            activeEndTime: moment(activeEndTime).format('YYYY-MM-DD HH:mm:ss'),
            image: !image[0].response?image[0].url: process.env.url + image[0].response.data.src
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
    const {
      form: { getFieldDecorator }, gradeList, subjectList, initData,
    } = this.props
    if (!initData) return <PageLoading />
    const {
      title, description, content, subjectId, expectedResult, grade, registrationStartTime, registrationEndTime, activeStartTime, activeEndTime, place, remarks, subject,image
    } = initData
    return (
      <Card
        title={<Breadcrumb separator=">" routes={routes} />}
        bordered={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="图片" extra="请上传格式为.png或.jpg的图片">
            {getFieldDecorator('image', {
              valuePropName: 'fileList',
              getValueFromEvent: this.handleUploadImageEvent,
              rules: [{ required: true, message: '图片不能为空' }],
              initialValue:[{
                uid: 1,
                name: image,
                url: image,
              }]
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
          <Form.Item label="暑期项目标题">
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="项目描述">
            {getFieldDecorator('description', {
              initialValue: description,
              rules: [{ required: true, message: '请输入' }],
            })(
              <TextArea
                maxLength={300}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="项目预期成果">
            {getFieldDecorator('expectedResult', {
              initialValue: expectedResult,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="适合专业">
            {getFieldDecorator('subjectId', {
              initialValue: subject,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {subjectList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="适合年级">
            {getFieldDecorator('grade', {
              initialValue: grade,
              rules: [{ required: true, message: '请勾选' }],
            })(
              <Checkbox.Group>
                {gradeList.map((item, key) => <Checkbox key={key} value={item.id}>{item.name}</Checkbox>)}
              </Checkbox.Group>,
            )}
          </Form.Item>
          <Form.Item label="报名开始时间">
            {getFieldDecorator('registrationStartTime', {
              initialValue: moment(registrationStartTime),
              rules: [{ required: true, message: '请输入' }],
            })(
              <DatePicker style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item label="报名结束时间">
            {getFieldDecorator('registrationEndTime', {
              initialValue: moment(registrationEndTime),
              rules: [{ required: true, message: '请输入' }],
            })(
              <DatePicker style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item label="活动开始时间">
            {getFieldDecorator('activeStartTime', {
              initialValue: moment(activeStartTime),
              rules: [{ required: true, message: '请输入' }],
            })(
              <DatePicker style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item label="活动结束时间">
            {getFieldDecorator('activeEndTime', {
              initialValue: moment(activeEndTime),
              rules: [{ required: true, message: '请输入' }],
            })(
              <DatePicker style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item label="活动地点">
            {getFieldDecorator('place', {
              initialValue: place,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remarks', {
              initialValue: remarks,
              rules: [{ required: true, message: '请输入' }],
            })(
              <TextArea
                maxLength={300}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item
            label="活动详细介绍"
            className="editor"
          >
            {getFieldDecorator('content', {
              initialValue: BraftEditor.createEditorState(content),
              rules: [{ required: true, message: '活动详细介绍不能为空' }],
            })(
              <Editor placeholder="请输入" />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => { router.push('/resource-library/summer-project') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SummerProjectEdit
