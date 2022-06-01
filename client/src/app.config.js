export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/sku/index',
    'pages/package/index',
    'pages/ship/index',
    'pages/address/index',
    'pages/addressEdit/index',
    'pages/boxSelect/index',
    'pages/webview/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#1f1f1f',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
  },
  usingComponents: {},
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/package/index',
        text: '赏袋',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
