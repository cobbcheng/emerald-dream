const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const refund = async ({ cloudPay, db, fee, openId }) => {
  const info = (
    await db
      .collection('yfs_pay')
      .where({
        _id: openId,
      })
      .get()
  ).data;
  if (!info) {
    return {
      code: 1,
      returnMsg: '没有支付记录',
    };
  }
  const uid = md5(uuidv4());
  const r = await cloudPay.refund({
    out_trade_no:info.uuid,
		out_refund_no:`TK-${info.uuid}`,
    total_fee: fee,
    refund_fee: fee,
    envId: 'yifanshang-8g5d7nxddf660e3e',
    functionName: 'refundCallback',
    sub_mch_id: '1623194504',
    nonce_str: uid,
    refund_desc: '一番赏退款-商品售罄',
  });
}

exports.refund = refund;