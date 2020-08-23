import React, { Component } from 'react'
import {
  Form, Input, Breadcrumb, Card, Col, Button, Row, message, Select, Upload,
} from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import PageLoading from '@/components/PageLoading'

const { Option } = Select
const routes = [
  {
    path: '/resource-library/school-library',
    breadcrumbName: '院校库管理',
  },
  {
    breadcrumbName: '编辑院校库',
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
@connect(({ schoolLibraryEdit }) => ({ ...schoolLibraryEdit }))
class SchoolLibraryEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch({
      type: 'schoolLibraryEdit/getDetail',
      params: {
        needId: id,
      },
    })
    this.props.dispatch({
      type: 'schoolLibraryEdit/getCountryList',
    })
  }


  componentWillUnmount() {
    this.props.dispatch({
      type: 'schoolLibraryEdit/save',
      payload: {
        initData: null,
      },
    })
  }

  handleSubmit=() => {
    const { id } = this.props.match.params
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!errors) {
        let { image } = values
        image =!image[0].response?image[0].url: process.env.url + image[0].response.data.src
        this.props.dispatch({
          type: 'schoolLibraryEdit/getEdit',
          params: {
            ...values, image, ...this.props.match.params, needId: id,
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
      form: { getFieldDecorator }, initData, countryList,
    } = this.props
    if (!initData) return <PageLoading />
    const {
      name, nameEn, countryId, address, website, usnewsRanking, qsRanking, thamesRanking, jiaotongRanking, tuition, admission, image,
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
          <Form.Item label="院校中文名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入院校中文名!' }],
              initialValue: name,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="院校英文名">
            {getFieldDecorator('nameEn', {
              rules: [{ required: true, message: '请输入院校英文名!' }],
              initialValue: nameEn,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="所属国家/地区">
            {getFieldDecorator('countryId', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: countryId,
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
              >
                {countryList.map((item, key) => <Option key={key} value={item.countryId}>{item.countryName}</Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学校地址">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入学校地址!' }],
              initialValue: address,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="学校网址">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: '请输入学校网址!' }],
              initialValue: website,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="USNEWS排名">
            {getFieldDecorator('usnewsRanking', {
              rules: [{ required: true, message: '请输入USNEWS排名!' }],
              initialValue: usnewsRanking,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="QS排名">
            {getFieldDecorator('qsRanking', {
              rules: [{ required: true, message: '请输入QS排名!' }],
              initialValue: qsRanking,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="泰晤士排名">
            {getFieldDecorator('thamesRanking', {
              rules: [{ required: true, message: '请输入泰晤士排名!' }],
              initialValue: thamesRanking,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="上海交大排名">
            {getFieldDecorator('jiaotongRanking', {
              rules: [{ required: true, message: '请输入上海交大排名!' }],
              initialValue: jiaotongRanking,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="年花费">
            {getFieldDecorator('tuition', {
              rules: [{ required: true, message: '请输入年花费!' }],
              initialValue: tuition,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
          <Form.Item label="平均录取率">
            {getFieldDecorator('admission', {
              rules: [{ required: true, message: '请输入平均录取率!' }],
              initialValue: admission,
            })(
              <Input
                maxLength={30}
                placeholder="请输入"
              />,
            )}
          </Form.Item>
        </Form>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSubmit}>更新</Button>
            <Button onClick={() => { router.push('/resource-library/school-library') }}>取消</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default SchoolLibraryEdit
