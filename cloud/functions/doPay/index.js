// 云函数入口文件
const cloud = require('wx-server-sdk');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

cloud.init({
  env: 'yifanshang-8g5d7nxddf660e3e',
});
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const uid = md5(uuidv4());
  const openId = event.userInfo.openId;
  const { payTotal, productNum, skuId } = event;

  const res = await cloud.cloudPay.unifiedOrder({
    body: '一番赏支付',
    outTradeNo: uid,
    // spbillCreateIp: JSON.parse(context.environment).WX_CLIENTIP || '127.0.0.1',
    spbillCreateIp: '127.0.0.1',
    subMchId: '1623194504',
    totalFee: 1,
    envId: 'yifanshang-8g5d7nxddf660e3e',
    functionName: 'payCallback',
    tradeType: 'JSAPI',
  });
  if (res.resultCode !== 'SUCCESS') {
    return {
      code: 1,
      returnMsg: res.returnMsg,
    };
  }

  const result = (
    await db
      .collection('yfs_pay')
      .where({
        _id: openId,
      })
      .get()
  ).data;

  if (result.length === 0) {
    await db.collection('yfs_pay').add({
      data: {
        _id: openId,
        uuid: uid,
      },
    });
  } else {
    await db
      .collection('yfs_pay')
      .doc(openId)
      .update({
        data: {
          uuid: uid,
        },
      });
  }

  await db.collection('yfs_trade').add({
    data: {
      uid,
      userid: openId,
      payTotal,
      productNum,
      skuId,
      payment: res.payment,
      status: 'NOTPAY',
    },
  });

  return {
    code: 0,
    uuid: uid,
    pay: res.payment,
  };
};
