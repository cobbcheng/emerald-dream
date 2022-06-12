const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const sub_mch_id = '1623194504';
const refund = async ({ cloudPay, db, fee, openId }) => {
  const payInfo = (
    await db
      .collection('yfs_pay')
      .where({
        _id: openId,
      })
      .get()
  ).data;
  if (!payInfo[0]) {
    return {
      code: 1,
      returnMsg: '没有支付记录',
    };
  }
  const uid = md5(uuidv4());
  const info = payInfo[0];
  console.log(info)
  const r = await cloudPay.refund({
    out_trade_no: info.uuid,
		out_refund_no:`TK-${info.uuid}`,
    total_fee: 1,
    refund_fee: 1,
    envId: 'yifanshang-8g5d7nxddf660e3e',
    functionName: 'afterPay',
    sub_mch_id,
    nonce_str: uid,
    refund_desc: '一番赏退款-商品售罄',
  });

  console.log(r)

  if (r.resultCode !== 'SUCCESS') {
    return {
      code: 1,
      returnMsg: r.returnMsg,
    };
  }
  const temp = {
    refund: r
  }
  const resq = await cloudPay.queryOrder({
    sub_mch_id,
    out_trade_no: info.uuid
  })
  if(resq.resultCode === 'SUCCESS'){
    temp.status = resq.tradeState
  }
  await db.collection('yfs_trade').where({
    uid: info.uuid
  }).update({
    data: temp
  })

  return {
    code: 0,
  }
}

exports.needRefund = ({orderList, num}) => {
  return orderList.length < num;
}
exports.refund = refund;