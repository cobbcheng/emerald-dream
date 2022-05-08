// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: 'yifanshang-8g5d7nxddf660e3e',
});
const db = cloud.database({
  throwOnNotFound: false,
});
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  const res = await db
    .collection('yfs_product')
    .aggregate()
    .match({
      userId: OPENID,
    })
    .lookup({
      from: 'yfs_item',
      localField: 'itemId',
      foreignField: '_id',
      as: 'item',
    })
    .limit(20)
    .end();

  return res;
};
