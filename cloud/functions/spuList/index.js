// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'yifanshang-8g5d7nxddf660e3e',
});
const db = cloud.database({
  throwOnNotFound: false,
});
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let res;
  try {
    const spuList  = await db.collection('yfs_spu').aggregate().lookup({
        from: 'yfs_sku',
        localField: '_id',
        foreignField: 'spuId',
        as: 'boxes',
      }).limit(20).end()
    res = spuList.list.map(item => {
      const {boxes} = item;
      const total = boxes.length;
      const left = boxes.filter(box => !box.isEmpty).length;
      return {
        total,
        left,
        detailPic: item.detailPic,
        _id: item._id,
        name: item.name,
        originPrice: item.originPrice,
      }
    })
  } catch(e) {
    res = e
  }


  return res
}