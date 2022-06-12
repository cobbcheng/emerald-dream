// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: 'yifanshang-8g5d7nxddf660e3e',
});
const db = cloud.database({
  throwOnNotFound: false,
});
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const result = (await db.collection('yfs_pay').doc(OPENID).get()).data;

  const res = await cloud.cloudPay.queryOrder({
    sub_mch_id: '1623194504',
    out_trade_no: result.uuid,
  });

  if (res.resultCode === 'SUCCESS') {
    console.log(res.resultCode);
    await db
      .collection('yfs_trade')
      .where({
        uid: result.uuid,
      })
      .update({
        data: {
          status: res.tradeState,
        },
      });
  }

  return { errcode: 0 };
};
