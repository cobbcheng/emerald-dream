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
      .collection('yfs_sku')
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
      boxes: boxes.list,
      stocks: stocks.data,
    };
  };

  let res = {};
  try {
    const { boxes, stocks } = await db.runTransaction(runTr);
    res = boxes.map((box) => {
      const result = {
        id: box._id,
        items: [],
      };
      stocks.forEach((stock) => {
        const l = stock.level;
        const item = {};
        const levelItem = box.orders.filter((order) => order.level === l);
        item.level = l;
        item.top = levelItem.length;
        item.left = levelItem.filter((it) => !it.isProvide).length;
        result.items.push(item);
      });

      return result;
    });
  } catch (e) {
    res = {};
  }

  return res;
};
