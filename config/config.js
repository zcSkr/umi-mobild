// https://umijs.org/config/
import path from 'path';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';

export default {
  // add for transfer to umi
  base: '/', //基础路径
  publicPath: '/phone/h5/', //打包路径 /phone/h5/
  history: 'hash', //hash
  outputPath: './dist',//默认打包输出路径./dist
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
        },
        title: {
          defaultTitle: '手机查询',
        },
        dll: false,
        pwa: false,
        hd: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': '#00A3FE'
  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 6,
    ios: 7,
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
  chainWebpack: webpackPlugin,
};
