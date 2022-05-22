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
  const wxContext = cloud.getWXContext();
  const { id } = event;

  const runTr = async (tr) => {
    const boxes = await tr
      .collection('yfs_box')
      .aggregate()
      .match({
        spuId: id,
      })
      .lookup({
        from: 'yfs_order',
        localField: '_id',
        foreignField: 'skuId',
        as: 'orders',
      })
      .end();

    const stocks = await tr
      .collection('yfs_item')
      .where({
        spuId: id,
      })
      .get();

    return {
      boxes,
      stocks,
    };
  };

  let res = {};
  try {
    res = await db.runTransaction(runTr);
  } catch (e) {
    res = {};
  }

  return res;
};
