import React, { Component } from 'react'
import {
  Layout, Menu, Icon, Avatar, Dropdown,
} from 'antd'
import { connect } from 'dva'
import style from './header.less'

const { Header } = Layout

@connect(({ global }) => ({ ...global }))
export default class HeaderView extends Component {
  render() {
    const {
      collapsed, handleMenuCollapse, handleLogout,
    } = this.props
    return (
      <Header className={style.header} style={{ left: collapsed ? 80 : 200 }}>
        <Icon
          className={style.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => handleMenuCollapse(!collapsed)}
        />
      </Header>
    )
  }
}
