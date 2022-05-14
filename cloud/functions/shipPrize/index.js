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
  const { list } = event;

  try {
    await db
      .collection('yfs_product')
      .where({
        _id: _.in(list),
      })
      .update({
        data: {
          status: 1,
        },
      });

    return 'success';
  } catch (err) {
    return err;
  }
};
