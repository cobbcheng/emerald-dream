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
const { refund } = require('./refund');

// 云函数入口函数
exports.main = async (event, context) => {
  const { skuId, num, payUid, payTotal } = event;
  const { OPENID } = cloud.getWXContext();
  const realFee = 1;
  // const realFee = payTotal * 100;

  const runTr = async (tr) => {
    // 是否抽终赏
    let limit = num;
    // 计算数量
    const orderLen = await tr
      .collection('yfs_order')
      .where({
        skuId,
        isProvide: false,
      })
      .count();
    if (orderLen.data < num + 1) {
      return {
        needRefund: true,
      };
    }

    if (orderLen.total === num + 1) {
      limit += 1;
    }

    // 读
    let order = await tr
      .collection('yfs_order')
      .aggregate()
      .match({
        skuId,
        isProvide: false,
      })
      .sort({
        order: 1,
      })
      .limit(limit)
      .end();

    const itemList = await tr
      .collection('yfs_item')
      .where({
        _id: _.in([...new Set(order.list.map((item) => item.itemId))]),
      })
      .get();

    // const result = itemList.data.map((item) => {
    //   const id = item._id;
    //   const num = order.list.filter((e) => e.itemId === id).length;
    //   return {
    //     num,
    //     _id: item._id,
    //     name: item.name,
    //     pic: item.pic,
    //     level: item.level,
    //   };
    // });
    const result = order.list.map((item) => {
      const id = item.itemId;
      const it = itemList.data.find((e) => e._id === id);
      return {
        num: item.num,
        _id: it._id,
        name: it.name,
        pic: it.pic,
        level: it.level,
      };
    });

    return { order, result };
  };

  // 写
  const writeData = ({ order }) => {
    db.collection('yfs_order')
      .where({
        _id: _.in(order.list.map((item) => item._id)),
      })
      .update({
        data: {
          isProvide: true,
        },
      });
    const productTable = [];
    order.list.forEach((item) => {
      productTable.push({
        userId: OPENID,
        tradeId: payUid,
        orderId: item._id,
        itemId: item.itemId,
        skuId,
        status: 0,
        statusReason: '',
        _createTime: Date.now(),
      });
    });
    db.collection('yfs_product').add({ data: productTable });
    db.collection('yfs_order')
      .where({
        skuId,
        isProvide: false,
      })
      .count()
      .then((r) => {
        if (r.total === 0) {
          db.collection('yfs_sku')
            .where({
              _id: skuId,
            })
            .update({
              data: {
                isEmpty: true,
              },
            });
        }
      });
  };

  let res = {};
  try {
    const { result, order, needRefund } = await db.runTransaction(runTr);
    res = result;
    if (needRefund) {
      refund({
        cloudPay: cloud.cloudPay,
        db,
        fee: realFee,
        openId: OPENID,
      });
    } else {
      writeData({ order, result });
    }
  } catch (e) {
    res = {
      error: e,
    };
  }

  return res;
};
