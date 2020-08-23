import React, { Component } from 'react'
import { Menu, Icon, Layout } from 'antd'
import Link from 'umi/link'
import style from './sliderMenu.less'

const { Sider } = Layout
const { SubMenu } = Menu

class SliderMenu extends Component {
  constructor(props) {
    super(props)
  }

  getNavMenuItems = (menusData) => {
    if (!menusData) return []
    return menusData.filter(item => item.path && !item.path.includes(':') && !item.hideInMenu).map(item => this.getSubMenuOrItem(item))
  }

  getSubMenuOrItem = (item) => {
    const { path, icon, title } = item
    if (item.routes) {
      return (
        <SubMenu
          title={
            icon ? (
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            ) : title
          }
          key={path}
          id={path}
        >
          {this.getNavMenuItems(item.routes)}
        </SubMenu>
      )
    }
    return <Menu.Item key={path} id={path}>{this.getMenuItemPath(item)}</Menu.Item>
  }

  getMenuItemPath = (item) => {
    const { title, path, icon } = item
    return (
      <Link
        to={path}
        replace={path === this.props.location.pathname}
      >
        {icon && <Icon type={icon} />}
        <span>{title}</span>
      </Link>
    )
  }

  getOpenKeys = (pathname) => {
    const arr = pathname.split('/')
    const openKeys = ['/']
    let temp = ''
    for (let i = 1; i < arr.length; i++) {
      temp += `/${arr[i]}`
      openKeys.push(temp)
    }
    return openKeys
  }


  render() {
    const {
      collapsed, location: { pathname }, routerConfig, route: { routes },
    } = this.props
    return (
      <Sider
        trigger={null}
        collapsible
        className={style.slider_menu}
        collapsed={collapsed}
      >
        <div className={style.logo_wrapper}>
          <a>
            {/*<img*/}
            {/*  className={style.logo}*/}
            {/*  src={require('../assets/favicon-32x32.png')}*/}
            {/*  alt="logo"*/}
            {/*/>*/}
            <h1 className={style.name}>留学生app后台管理</h1>
          </a>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          defaultOpenKeys={this.getOpenKeys(pathname)}
          selectedKeys={[pathname]}
        >
          {this.getNavMenuItems(routes)}
        </Menu>
      </Sider>
    )
  }
}

export default SliderMenu
