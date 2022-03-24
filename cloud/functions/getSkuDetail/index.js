// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database({
  throwOnNotFound: false,
});
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event;

  const runTr = async (tr) => {
    const boxes = await tr
      .collection('box')
      .where({
        sku_id: id,
      })
      .get();

    const map = boxes.data.map((box) => box._id);
    const stocks = await tr
      .collection('stock')
      .where({
        box_id: _.in(map),
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
