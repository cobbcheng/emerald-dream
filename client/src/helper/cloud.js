wx.cloud.init({
  env: 'yifanshang-8g5d7nxddf660e3e',
  traceUser: true,
});
const db = wx.cloud.database({
  throwOnNotFound: false,
});

export const getCloud = () => {
  return {
    db,
    callFunction: wx.cloud.callFunction,
  };
};
