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
  const { id } = event;
  const runTr = async (tr) => {
    const order = await tr
      .collection('yfs_order')
      .where({
        skuId: id,
      })
      .get();

    const items = order.data.map((item) => item.itemId);
    const itemIds = [...new Set(items)];
    const { data } = await tr
      .collection('yfs_item')
      .where({
        _id: _.in(itemIds),
      })
      .get();

    return data.map((item) => {
      const orderedItem = order.data.filter((e) => e.itemId === item._id);
      item.total = orderedItem.length;
      item.left = orderedItem.filter((r) => !r.isProvide).length;
      return item;
    });
  };

  let res = {};
  try {
    res = await db.runTransaction(runTr);
  } catch (e) {
    res = {};
  }

  return res;
};
