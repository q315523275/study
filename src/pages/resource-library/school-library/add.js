import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, Radio, Select, Upload, message,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import treeData from '@/static/js/area.json'

const { Option } = Select
const routes = [
  {
    path: '/resource-library/school-library',
    breadcrumbName: '院校库管理',
  },
  {
    breadcrumbName: '新增院校库',
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
@connect(({ schoolLibraryAdd }) => ({ ...schoolLibraryAdd }))
class SchoolLibraryAdd extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'schoolLibraryAdd/getCountryList',
    })
  }

  handleSubmit=() => {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        let { image } = values
        image = process.env.url + image[0].response.data.src
        this.props.dispatch({
          type: 'schoolLibraryAdd/getAdd',
          params: { ...values, image },
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
    const { form: { getFieldDecorator }, countryList } = this.props
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
          <Form.Item label="院校中文名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入院校中文名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="院校英文名">
            {getFieldDecorator('nameEn', {
              rules: [{ required: true, message: '请输入院校英文名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="所属国家/地区">
            {getFieldDecorator('countryId', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {countryList.map(({ countryId, countryName }, key) => <Option key={key} value={countryId}>{countryName}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学校地址">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入学校地址!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="学校网址">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: '请输入学校网址!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="USNEWS排名">
            {getFieldDecorator('usnewsRanking', {
              rules: [{ required: true, message: '请输入USNEWS排名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="QS排名">
            {getFieldDecorator('qsRanking', {
              rules: [{ required: true, message: '请输入QS排名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="泰晤士排名">
            {getFieldDecorator('thamesRanking', {
              rules: [{ required: true, message: '请输入泰晤士排名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="上海交大排名">
            {getFieldDecorator('jiaotongRanking', {
              rules: [{ required: true, message: '请输入上海交大排名!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="年花费">
            {getFieldDecorator('tuition', {
              rules: [{ required: true, message: '请输入年花费!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="平均录取率">
            {getFieldDecorator('admission', {
              rules: [{ required: true, message: '请输入平均录取率!' }],
            })(
              <Input
                placeholder="请输入"
              />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => { router.push('/resource-library/school-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolLibraryAdd
