export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login'
      },
      {
        name: '注册',
        path: '/user/register',
        component: './User/Register'
      },
    ],
  },

  {path: '/', redirect: '/add_chart'},
  {path: '/add_chart', name: '智能分析（同步）', icon: 'barChart', component: './Chart/AddChart'},
  {path: '/add_chart_async', name: '智能分析（异步）', icon: 'barChart', component: './Chart/AddChartAsync'},
  {path: '/add_chart_async_mq', name: '智能分析（异步mq）', icon: 'barChart', component: './Chart/AddChartAsyncMq'},
  {path: '/my_chart', name: '我的图表', icon: 'pieChart', component: './Chart/MyChart'},

  {
    name: '个人中心',
    path: '/user/my',
    icon: 'userOutlined',
    component: './User/My',
  },
  {
    path: '/admin',
    name: '管理页面',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '图表管理',
        path: '/admin/chart',
        component: './Admin/Chart'
      },
      {
        name: '用户管理',
        path: '/admin/user',
        component: './Admin/User'
      },
    ],
  },
  {
    path: '*',
    layout: false,
    component: './404'
  },
];
