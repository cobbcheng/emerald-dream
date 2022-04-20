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
    const { data: detail } = await tr
      .collection('yfs_spu')
      .where({
        _id: id,
      })
      .field({
        _id: true,
        headPic: true,
        name: true,
        originPrice: true,
        status: true,
      })
      .get();
    const { data: boxes } = await tr
      .collection('yfs_sku')
      .where({
        spuId: id,
      })
      .field({
        left: true,
        number: true,
        price: true,
        _id: true,
      })
      .get();

    const detailData = detail[0];
    if (!detailData) {
      return {
        detail: null,
        boxes: null,
      };
    }
    return {
      detail: detailData,
      boxes,
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
