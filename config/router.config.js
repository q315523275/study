export default [
  {
    path: '/login',
    component: './login',
    title: '留学后台登录',
    name: 'login',
  },
  {
    path: '/',
    component: '../layout/',
    routes: [
      {
        path: '/home',
        component: './home',
        title: '首页',
        name: 'title',
        hideInMenu: true,
      },
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/404',
        component: './404.js',
        hideInMenu: true,
      },
      {
        path: '/403',
        component: './403.js',
        hideInMenu: true,
      },
      {
        path: '/resource-library',
        title: '资源库管理',
        name: 'resource-library',
        routes: [
          {
            path: '/resource-library/school-library',
            component: './resource-library/school-library',
            title: '院校库管理',
            name: 'school-library',
          },
          {
            path: '/resource-library/school-library/add',
            component: './resource-library/school-library/add',
            title: '新增院校库',
            name: 'school-library/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/school-library/edit/:id',
            component: './resource-library/school-library/edit',
            title: '编辑院校库',
            name: 'school-library/edit',
            hideInMenu: true,
          },
          {
            path: '/resource-library/domain-library',
            component: './resource-library/domain-library',
            title: '专业库管理',
            name: 'domain-library',
          },
          {
            path: '/resource-library/domain-library/add',
            component: './resource-library/domain-library/add',
            title: '新增专业库',
            name: 'domain-library/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/domain-library/edit/:id',
            component: './resource-library/domain-library/edit',
            title: '编辑专业库',
            name: 'domain-library/edit',
            hideInMenu: true,
          },
          {
            path: '/resource-library/school-domain',
            component: './resource-library/school-domain',
            title: '院校专业库管理',
            name: 'school-domain',
          },
          {
            path: '/resource-library/school-domain/add',
            component: './resource-library/school-domain/add',
            title: '新增院校专业库',
            name: 'school-domain/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/school-domain/edit/:id',
            component: './resource-library/school-domain/edit',
            title: '编辑院校专业库',
            name: 'school-domain/edit',
            hideInMenu: true,
          },
          {
            path: '/resource-library/school-case',
            component: './resource-library/school-case',
            title: '院校案例库管理',
            name: 'school-case',
          },
          {
            path: '/resource-library/school-case/add',
            component: './resource-library/school-case/add',
            title: '新增院校案例库',
            name: 'school-case/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/school-case/edit/:id',
            component: './resource-library/school-case/edit',
            title: '编辑院校案例库',
            name: 'school-case/edit',
            hideInMenu: true,
          },
          {
            path: '/resource-library/summer-project',
            component: './resource-library/summer-project',
            title: '暑期项目库管理',
            name: 'summer-project',
          },
          {
            path: '/resource-library/summer-project/add',
            component: './resource-library/summer-project/add',
            title: '新增暑期项目库',
            name: 'summer-project/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/summer-project/edit/:id',
            component: './resource-library/summer-project/edit',
            title: '编辑暑期项目库',
            name: 'summer-project/edit',
            hideInMenu: true,
          },
          {
            path: '/resource-library/background-promote',
            component: './resource-library/background-promote',
            title: '背景提升库管理',
            name: 'background-promote',
          },
          {
            path: '/resource-library/background-promote/add',
            component: './resource-library/background-promote/add',
            title: '新增背景提升库',
            name: 'background-promote/add',
            hideInMenu: true,
          },
          {
            path: '/resource-library/background-promote/edit/:id',
            component: './resource-library/background-promote/edit',
            title: '编辑背景提升库',
            name: 'background-promote/edit',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/message-manage',
        title: '信息管理',
        name: 'message-manage',
        routes: [
          {
            path: '/message-manage/column-maintain',
            component: './message-manage/column-maintain',
            title: '栏目维护',
            name: 'column-maintain',
          },
          {
            path: '/message-manage/column-maintain/add',
            component: './message-manage/column-maintain/add',
            title: '新增栏目',
            name: 'column-maintain/add',
            hideInMenu: true,
          },
          {
            path: '/message-manage/column-maintain/edit/:id',
            component: './message-manage/column-maintain/edit',
            title: '编辑栏目',
            name: 'column-maintain/edit',
            hideInMenu: true,
          },
          {
            path: '/message-manage/information-publish',
            component: './message-manage/information-publish',
            title: '信息发布',
            name: 'information-publish',
          },
          {
            path: '/message-manage/information-publish/add',
            component: './message-manage/information-publish/add',
            title: '新增信息',
            name: 'information-publish/add',
            hideInMenu: true,
          },
          {
            path: '/message-manage/information-publish/edit/:id',
            component: './message-manage/information-publish/edit',
            title: '编辑信息',
            name: 'information-publish/edit',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/discover-manage',
        title: '发现管理',
        name: 'discover-manage',
        routes: [
          {
            path: '/discover-manage/note',
            component: './discover-manage/note',
            title: '笔记管理',
            name: 'note',
          },
          {
            path: '/discover-manage/note/check/:id',
            component: './discover-manage/note/check',
            title: '审核笔记',
            name: 'note/check',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/forum-manage',
        title: '论坛管理',
        name: 'forum-manage',
        routes: [
          {
            path: '/forum-manage/group',
            component: './forum-manage/group',
            title: '小组管理',
            name: 'group',
          },
          {
            path: '/forum-manage/group/add',
            component: './forum-manage/group/add',
            title: '新增小组',
            name: 'group/add',
            hideInMenu: true,
          },
          {
            path: '/forum-manage/group/edit/:id',
            component: './forum-manage/group/edit',
            title: '编辑小组',
            name: 'group/edit',
            hideInMenu: true,
          },
          {
            path: '/forum-manage/topic',
            component: './forum-manage/topic',
            title: '讨论话题管理',
            name: 'topic',
          },

          {
            path: '/forum-manage/topic/check/:id',
            component: './forum-manage/topic/check',
            title: '讨论话题审核',
            name: 'topic/check',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/feedback-manage',
        title: '意见反馈管理',
        name: 'feedback-manage',
        routes: [
          {
            path: '/feedback-manage/feedback',
            component: './feedback-manage/feedback',
            title: '意见反馈',
            name: 'feedback',
          },
          {
            path: '/feedback-manage/feedback/add',
            component: './feedback-manage/feedback/add',
            title: '新增意见反馈',
            name: 'feedback/add',
            hideInMenu: true,
          },
          {
            path: '/feedback-manage/feedback/edit/:id',
            component: './feedback-manage/feedback/edit',
            title: '编辑意见反馈',
            name: 'feedback/edit',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/system-manage',
        title: '系统管理',
        name: 'system-manage',
        routes: [
          {
            path: '/system-manage/institutional',
            component: './system-manage/institutional',
            title: '组织机构管理',
            name: 'institutional',
          },
          {
            path: '/system-manage/institutional/add',
            component: './system-manage/institutional/add',
            title: '新增组织机构',
            name: 'institutional/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/institutional/edit/:id',
            component: './system-manage/institutional/edit',
            title: '编辑组织机构',
            name: 'institutional/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/employees-account',
            component: './system-manage/employees-account',
            title: '员工账号管理',
            name: 'employees-account',
          },
          {
            path: '/system-manage/employees-account/add',
            component: './system-manage/employees-account/add',
            title: '新增员工账号',
            name: 'employees-account/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/employees-account/edit/:id',
            component: './system-manage/employees-account/edit',
            title: '编辑员工账号',
            name: 'employees-account/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/register-account',
            component: './system-manage/register-account',
            title: '注册用户管理',
            name: 'register-account',
          },
          {
            path: '/system-manage/register-account/add',
            component: './system-manage/register-account/add',
            title: '新增注册用户',
            name: 'register-account/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/register-account/edit/:id',
            component: './system-manage/register-account/edit',
            title: '编辑注册用户',
            name: 'register-account/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/role',
            component: './system-manage/role',
            title: '角色管理',
            name: 'role',
          },
          {
            path: '/system-manage/role/add',
            component: './system-manage/role/add',
            title: '新增角色',
            name: 'role/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/role/edit/:id',
            component: './system-manage/role/edit',
            title: '编辑角色',
            name: 'role/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/jurisdiction',
            component: './system-manage/jurisdiction',
            title: '权限管理',
            name: 'jurisdiction',
          },
          {
            path: '/system-manage/jurisdiction/add',
            component: './system-manage/jurisdiction/add',
            title: '新增权限',
            name: 'jurisdiction/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/jurisdiction/edit/:id',
            component: './system-manage/jurisdiction/edit',
            title: '编辑权限',
            name: 'jurisdiction/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/log',
            component: './system-manage/log',
            title: '日志管理',
            name: 'log',
          },
          {
            path: '/system-manage/log/add',
            component: './system-manage/log/add',
            title: '新增日志',
            name: 'log/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/log/edit/:id',
            component: './system-manage/log/edit',
            title: '编辑日志',
            name: 'log/edit',
            hideInMenu: true,
          },
          {
            path: '/system-manage/dictionaries',
            component: './system-manage/dictionaries',
            title: '数据字典管理',
            name: 'dictionaries',
          },
          {
            path: '/system-manage/dictionaries/add',
            component: './system-manage/dictionaries/add',
            title: '新增数据字典',
            name: 'dictionaries/add',
            hideInMenu: true,
          },
          {
            path: '/system-manage/dictionaries/edit/:id',
            component: './system-manage/dictionaries/edit',
            title: '编辑数据字典',
            name: 'dictionaries/edit',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
]
