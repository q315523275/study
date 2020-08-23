import React, { Component } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Icon, message, Modal } from 'antd'
import styles from './style.less'


/**
 * 编辑器图片上传
 * @param param
 */
const pictureUploadFn = (param) => {
  const serverURL = `${process.env.uploadImg}`
  const xhr = new XMLHttpRequest()
  const fd = new FormData()
  const successFn = (response) => {
    param.success({
      url: process.env.url + JSON.parse(response.currentTarget.response).data.src,
      meta: { alt: 'picture' },
    })
  }
  const progressFn = (event) => {
    param.progress((event.loaded / event.total) * 100)
  }
  const errorFn = () => {
    param.error({
      msg: '上传失败',
    })
  }
  xhr.upload.addEventListener('progress', progressFn, false)
  xhr.addEventListener('load', successFn, false)
  xhr.addEventListener('error', errorFn, false)
  xhr.addEventListener('abort', errorFn, false)
  fd.append('file', param.file)
  xhr.open('POST', serverURL, true)
  xhr.send(fd)
}

/**
 * 编辑器上传图片大小限制
 * @param file
 * @returns {boolean}
 */
const sizeValidateFn = (file) => {
  if (!(file.size < 1024 * 2000)) {
    message.error('图片大小不能超过2MB')
    return false
  }
  return true
}


class Editor extends Component {
  constructor() {
    super()
    this.state = {
      editorState: BraftEditor.createEditorState(),
    }
  }

  /**
   * 编辑器change事件
   * @param editorState
   */
  handleChange = (editorState) => {
    this.setState({ editorState })
    const { onChange } = this.props
    if (onChange) {
      onChange(editorState)
    }
  }

  /**
   * 编辑器预览功能
   */
  handleShowPreview = () => {
    const { value } = this.props
    Modal.info({
      title: '预览',
      okText: '关闭',
      width: 1000,
      className: styles['preview-modal'],
      icon: <Icon type="profile" />,
      content: (
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: value && (typeof (value) === 'string' ? this.state.editorState.toHTML() : value.toHTML()) }}
        />
      ),
    })
  }


  render() {
    const {
      placeholder, value, readOnly,
    } = this.props
    // 编辑器菜单配置
    const basicControls = [
      'undo',
      'redo',
      {
        key: 'font-size',
        title: <div style={{ fontSize: 12 }}>字号</div>,
      },
      'bold',
      'text-align',
      'text-indent',
      'list-ul',
      'list-ol',
      {
        key: 'media',
        title: '插入图片',
        text: <Icon type="picture" />,
      },
      'remove-styles',
      {
        key: 'custom-button',
        type: 'button',
        text: <div style={{ fontSize: 12 }}>预览</div>,
        onClick: this.handleShowPreview,
      },
    ]

    return (
      <BraftEditor
        media={{
          uploadFn: pictureUploadFn,
          validateFn: sizeValidateFn,
          accepts: {
            video: false,
            audio: false,
          },
          externals: {
            video: false,
            audio: false,
            embed: false,
          },
        }}
        onChange={this.handleChange}
        placeholder={placeholder}
        controls={basicControls}
        value={value}
        readOnly={readOnly}
        controlBarClassName={styles.controlBar}
        contentClassName={styles.content}
        className="editorCustomStyle"
      />
    )
  }
}

export default Editor
