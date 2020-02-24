export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './Index/Index', name: '首页' },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', name: '无权限', component: './exception/403' },
          { path: '/exception/500', name: '服务器出错了', component: './exception/500' },
        ],
      },
      { component: '404', name: '页面没找到' },
      
    ],
  }
];
