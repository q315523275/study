import React, { Component } from 'react'
import { Layout, Spin } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import Tools from '@/utils/tools'
import pathToRegexp from 'path-to-regexp'
import SliderMenu from './sliderMenu'
import Header from './header'
// import style from './index.less'
// import { dataUploadReq } from '../api/global'
import Exception403 from '../pages/403'
import Exception404 from '../pages/404'


class BasicLayout extends Component {
  componentDidMount() {
    const { route: { routes } } = this.props
    const url = '/basic-information/enterprise/introduce-'
    const match1 = pathToRegexp('/basic-information/enterprise/introduce/(.*)').exec(url) // url 路径
  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'global/getLogout' })
  }

  // 用户实际的路由中是否含有当前path 403
  havePermissionUser = (path, routeData) => {
    let isPermission = false
    const fn = (val, arr) => {
      arr.forEach((route) => {
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          isPermission = true
        }
        if (route.routes) {
          fn(path, route.routes)
        }
      })
    }
    fn(path, routeData)
    return isPermission
  }

  // 当前路由配置中是否含有该路由 404
  havePermissionAll = (path, routeData) => {
    let isPermission = false
    const fn = (val, arr) => {
      arr.forEach((route) => {
        if (pathToRegexp(`${route.path}`).test(path)) {
          isPermission = true
        }
        if (route.routes) {
          fn(path, route.routes)
        }
      })
    }
    fn(path, routeData)
    return isPermission
  }

  render() {
    const {
      children, collapsed, location: { pathname }, route: { routes }, routerConfig,
    } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SliderMenu {...this.props} />
        <Layout style={{ transitionProperty: 'all', transitionDuration: '0.2s', marginLeft: collapsed ? 80 : 200 }}>
          <Header
            handleMenuCollapse={this.handleMenuCollapse}
            handleLogout={this.handleLogout}
            pathname={pathname}
            {...this.props}
          />
          <Layout.Content
            style={{
              margin: '72px 0 0',
              overflow: 'initial',
              background: '#fff',
            }}
          >

            {
                // eslint-disable-next-line no-nested-ternary
              children
              // this.havePermissionAll(pathname, routes) ? (routerConfig.length > 0 ? (this.havePermissionUser(pathname, routerConfig) ? children : <Exception403 />) : <Spin style={{position: 'absolute', left: '50%', top: '50%'}}/>) : <Exception404 />
            }
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ global, menu }) => ({ ...global, ...menu }))(props => <BasicLayout {...props} />)
