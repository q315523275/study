import pageRoutes from './router.config'
import proxy from './proxy.config'
import defaultSetting from '../src/defaultSettings'

const { title, primaryColor } = defaultSetting

const isDev = process.env.NODE_ENV === 'production'


export default {
  treeShaking: true,
  base: '/',
  publicPath: './',
  history: 'hash',
  outputPath: './html',
  devtool: isDev ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  hash: true,
  define: {
    'process.env.uploadImg': 'http://47.114.151.211:8081/api/common/file',
    'process.env.url': 'http://47.114.151.211:8081',
    'process.env.upload': 'http://47.114.151.211:8081/api/common/file',
    'process.env.uploadFileToZmp': '/zuul/api/v1/operation/contract/zmpUploadFile',
    'process.env.platform': '/platform/#',
    'process.env.gray': '/api/v1',
    'process.env.uploadFile': '/zuul/api/v1/consulation/uploadFile',
    'process.env.CONNECTOR': 'j2b3g6ts3i', // 连接附件与切割附件
    'process.env.getHtml': '/api/v1/consulation/template/getHtml', // 上传getHtml
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        extends: 'eslint-config-umi',
        title,
        useLocale: true, // 设置title
        dynamicImport: { webpackChunkName: true },
        dll: true,
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
          antd: true,
        },
      },
    ],
    // 是否启用antd的<LocaleProvider />
    // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  // 加入 theme 定义
  theme: {
    '@primary-color': primaryColor,
  },
  autoprefixer: {
    // flexbox: 'no-2019',
    flexbox: true,
  },
  targets: { ie: 10 },
  chainWebpack: (config) => {
  // config.plugins.delete('progress')// 删除进度条插件
  // config.module.rule('lint')
  //   .test(/\.js$/)
  //   .pre()
  //   .include
  //   .add('src')
  //   .end()
  // .use('eslint')
  // .loader('eslint-loader')
  // .options({
  //   rules: {
  //     semi: 'off'
  //   }
  // });
  },
  proxy,
  routes: pageRoutes,
  manifest: {
    basePath: './',
  },
}
