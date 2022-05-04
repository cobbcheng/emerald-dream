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
  const { skuId, num } = event;

  const runTr = async (tr) => {
    // 读
    const order = await tr
      .collection('yfs_order')
      .aggregate()
      .match({
        skuId,
        isProvide: false,
      })
      .sort({
        order: 1,
      })
      .limit(num)
      .end();

    const itemList = await tr
      .collection('yfs_item')
      .where({
        _id: _.in([...new Set(order.list.map((item) => item.itemId))]),
      })
      .get();

    const result = itemList.data.map((item) => {
      const id = item._id;
      const num = order.list.filter((e) => e.itemId === id).length;
      return {
        num,
        _id: item._id,
        name: item.name,
        pic: item.pic,
        level: item.level,
      };
    });

    return { order, result };
  };

  // 写
  const writeData = ({ order }) => {
    db.collection('yfs_order')
      .where({
        _id: _.in(order.list.map((item) => item.itemId)),
      })
      .update({
        data: {
          isProvide: true,
        },
      });
  };

  let res = {};
  try {
    const { result, order } = await db.runTransaction(runTr);
    res = result;
    writeData({ order });
  } catch (e) {
    res = {
      error: e,
    };
  }

  return res;
};
