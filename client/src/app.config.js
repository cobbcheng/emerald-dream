export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/sku/index',
    'pages/package/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {},
  tabBar: {
    custom: true,
    list: [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/package/index",
        "text": "赏袋"
      },
      {
        "pagePath": "pages/mine/index",
        "text": "我的"
      }

    ]
  }
})
