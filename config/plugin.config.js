// Change theme plugin
import path from 'path';

export default config => {

  // svg-sprite-loader另外一种处理svg的方式
  config.module.rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));
};
