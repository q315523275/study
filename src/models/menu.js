import { getMenuReq } from '../services/menu'

export default {
  namespace: 'menu',
  state: {
    routerConfig: [],
  },
  effects: {
    * getMenuData({ params }, { call, put }) {
      const { routes, userType } = params
      const res = yield call(getMenuReq, { userType })
      // 添加无需权限菜单
      res.unshift(
        {
          icon: 'appstore', path: '/home', title: '运营大屏', hidden: 0,
        },
        {
          path: '/password', title: '修改密码', hidden: 1,
        },
      )
      // 过滤出该用户实际路由
      const routerConfig = filterRoute(routes, res)
      yield put({
        type: 'save',
        payload: { routerConfig },
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const filterRoute = (routes, authRoute) => {
  const arr = []
  authRoute.forEach((item) => {
    routes.forEach((route) => {
      if (route.path === item.path) {
        let obj = {}
        if (route.routes && item.children) {
          obj = {
            path: item.path, title: item.title, icon: item.icon, hideInMenu: item.hidden === 1,
          }
          route.component && (obj.component = route.component)
          obj.routes = (filterRoute(route.routes, item.children))
          arr.push(obj)
        } else {
          obj = {
            path: item.path, title: item.title, icon: item.icon, hideInMenu: item.hidden === 1,
          }
          route.component && (obj.component = route.component)
          arr.push(obj)
        }
      }
    })
  })
  return arr
}
