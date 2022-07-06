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
  const {
    payTotal,
    productNum,
    skuId = null,
    body = '一番赏支付',
    functionName = 'payCallback',
    payType = 'default',
    productList = [],
  } = event;

  // const realFee = payTotal * 100;
  const realFee = 1;

  const res = await cloud.cloudPay.unifiedOrder({
    body,
    outTradeNo: uid,
    // spbillCreateIp: JSON.parse(context.environment).WX_CLIENTIP || '127.0.0.1',
    spbillCreateIp: '127.0.0.1',
    subMchId: '1623194504',
    totalFee: realFee,
    envId: 'yifanshang-8g5d7nxddf660e3e',
    functionName,
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

  if (payType === 'default') {
    await db.collection('yfs_trade').add({
      data: {
        uid,
        userid: openId,
        payTotal: realFee,
        productNum,
        skuId,
        payment: res.payment,
        status: 'NOTPAY',
        _createTime: Date.now(),
      },
    });
  }

  if (payType === 'postage') {
    await db.collection('yfs_postage').add({
      data: {
        uid,
        userid: openId,
        payTotal: realFee,
        payment: res.payment,
        status: 'NOTPAY',
        productList,
        _createTime: Date.now(),
      },
    });
  }

  if (payType === 'recharge') {
    // TODO
  }

  return {
    code: 0,
    uuid: uid,
    pay: res.payment,
  };
};
