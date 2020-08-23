import React from 'react'
import {
  Form, Input, Button,
} from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import { sha256 } from 'js-sha256'
import Tools from '@/utils/tools'
import styles from './style.less'

const namespace = 'loginSpace'
const FormItem = Form.Item

const loginUserImg = require('../../assets/login-user.png')
const loginPasswordImg = require('../../assets/login-password.png')


@connect(state => ({ ...state, loading: state.loading.effects['loginSpace/loginMsg'] }))
class Register extends React.Component {
  componentWillMount() {
    if (Tools.isLogin()) {
      router.push('/home')
    } else {
      document.addEventListener('keyup', this.handleEnterKey)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEnterKey)
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { phoneNumber, password } = values
        const params = {
          phoneNumber,
          password,
          // password: sha256(password),
        }
        this.props.dispatch({
          type: `${namespace}/loginMsg`,
          params,
        })
      }
    })
  };

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  render() {
    const { form: { getFieldDecorator }, loading } = this.props
    return (
      <div
        className={styles.loginBackdropBg}
        style={{ height: window.innerHeight }}
      >
        <div className={styles.login}>
          <div className={styles.loginTitle}>
            <h4>后台</h4>
          </div>
          <div className={styles.loginBox}>
            <Form className={styles.fix_explain}>
              {/* //todo */}
              <FormItem className={styles.loginInputWrap} style={{ marginBottom: 20 }}>
                {getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: '请输入用户名或手机号' }],
                })(<Input size="default" placeholder="请输入用户名或手机号" autoComplete="off" />)}
                <img src={loginUserImg} alt="11" />
              </FormItem>
              <FormItem className={styles.loginInputWrap} style={{ marginBottom: 6 }}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(<Input type="password" placeholder="请输入密码" autoComplete="off" />)}
                <img src={loginPasswordImg} alt="22" />
              </FormItem>
              <FormItem style={{ marginBottom: 15, marginTop: 35 }}>
                <Button
                  type="default"
                  className={styles.btn}
                  loading={loading}
                  onClick={this.handleSubmit}
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'LoginFom' })(Register)
