import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Select, Checkbox, Upload, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PageLoading from '@/components/PageLoading'

const { TextArea } = Input
const { Option } = Select
const routes = [
  {
    path: '/resource-library/background-promote',
    breadcrumbName: '背景提升库管理',
  },
  {
    breadcrumbName: '编辑背景提升库',
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
@connect(({ backgroundPromoteEdit }) => ({ ...backgroundPromoteEdit }))
class BackgroundPromoteEdit extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'backgroundPromoteEdit/getInitData',
      params: { id: this.props.match.params.id },
    })
    this.props.dispatch({
      type: 'backgroundPromoteEdit/getSelectList',
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        let { image } = values
        image =!image[0].response?image[0].url: process.env.url + image[0].response.data.src
        this.props.dispatch({
          type: 'backgroundPromoteEdit/getEdit',
          params: { ...values, id: this.props.initData.id, image },
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
      form: { getFieldDecorator }, gradeList, categoryList, goldList, subjectList, initData,
    } = this.props
    console.log(initData)
    if (!initData) return <PageLoading />
    const {
      title, description, categoryId, subjectId, goldId, grade, expectedResult, examinationForm, examinationResource, examinationArrangement, examinationContent, website,image
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
          <Form.Item label="背景提升项目标题">
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={80}
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
                maxLength={800}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="项目分类">
            {getFieldDecorator('categoryId', {
              initialValue: categoryId,
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {categoryList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="含金量">
            {getFieldDecorator('goldId', {
              initialValue: goldId,
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {goldList.map(({ id, name }, key) => <Option key={key} value={id}>{name}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="项目预期成果">
            {getFieldDecorator('expectedResult', {
              initialValue: expectedResult,
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input
                maxLength={80}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="适合专业">
            {getFieldDecorator('subjectId', {
              initialValue: subjectId,
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
          <Form.Item label="考试形式">
            {getFieldDecorator('examinationForm', {
              initialValue: examinationForm,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={80}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="考试安排">
            {getFieldDecorator('examinationArrangement', {
              initialValue: examinationArrangement,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={80}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="考试内容">
            {getFieldDecorator('examinationContent', {
              initialValue: examinationContent,
              rules: [{ required: true, message: '请输入' }],
            })(
              <TextArea
                maxLength={800}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="考试资源">
            {getFieldDecorator('examinationResource', {
              initialValue: examinationResource,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={80}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="相关网站">
            {getFieldDecorator('website', {
              initialValue: website,
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input
                maxLength={80}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => { router.push('/resource-library/background-promote') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default BackgroundPromoteEdit
