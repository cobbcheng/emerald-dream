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
  const { page, skuId } = event;
  const record = await db
    .collection('yfs_product')
    .aggregate()
    .match({
      skuId,
    })
    .lookup({
      from: 'user_info',
      localField: 'userId',
      foreignField: '_id',
      as: 'userInfo',
    })
    .lookup({
      from: 'yfs_item',
      localField: 'itemId',
      foreignField: '_id',
      as: 'item',
    })
    .sort({
      _createTime: -1,
    })
    .skip((page - 1) * 20)
    .limit(20)
    .end();

  return record.list.map((r) => {
    const { userInfo, item } = r;
    return {
      _id: r._id,
      level: item[0].level,
      item: item[0].name,
      avatarUrl: userInfo[0].avatarUrl,
      nickName: userInfo[0].nickName,
      _createTime: r._createTime,
    };
  });
};
