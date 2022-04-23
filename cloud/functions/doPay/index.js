// 云函数入口文件
const cloud = require('wx-server-sdk');
const { v4: uuidv4 } = require('uuid');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const uid = uuidv4();
  const openId = event.userInfo.openId;
  const res = await cloud.cloudPay.unifiedOrder({
    body: '测试微信支付功能',
    outTradeNo: uid,
    spbillCreateIp: JSON.parse(context.environment).WX_CLIENTIP,
    subMchId: sub_mch_id,
    totalFee: 1,
    envId: cloud.DYNAMIC_CURRENT_ENV,
    functionName: 'payCallback',
    tradeType: 'JSAPI',
  });
  if (res.resultCode !== 'SUCCESS') {
    return {
      code: 1,
      returnMsg: res.returnMsg,
    };
  }

  return {
    code: 0,
    uuid: uid,
    pay: res.payment,
  };
};
