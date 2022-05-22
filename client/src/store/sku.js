import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Sku {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable boxes = [];
  @observable prizeList = [];
  @observable detail = {};

  // 中奖弹窗信息
  @observable lotteryDialogVisible = false;
  @observable lotteryDialogInfo = [];

  get notEmptyBoxes() {
    return this.boxes.filter((box) => {
      return box.left > 0;
    });
  }

  @action.bound
  hideLotteryDialog() {
    this.lotteryDialogVisible = false;
  }

  @action.bound
  getSpuDetail(id) {
    return this.callFunction({
      name: 'getSpuDetail',
      data: {
        id,
      },
    }).then((res) => {
      const { detail, boxes } = res.result;
      this.detail = detail;
      this.boxes = boxes;
      return Promise.resolve();
    });
  }

  @action.bound
  getPrizeList(boxId) {
    this.callFunction({
      name: 'getSku',
      data: {
        id: boxId,
      },
    }).then((res) => {
      this.prizeList = res.result.sort((s, t) => {
        const a = s.level.toLowerCase();
        const b = t.level.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
    });
  }

  @action.bound
  async pay({ payTotal, productNum, skuId, clientEnd = () => {}, allEnd = () => {} }) {
    wx.showLoading({
      title: '支付中',
    });

    const res = await this.callFunction({
      name: 'doPay',
      data: { payTotal, productNum, skuId },
    });
    if (res.result.code !== 0) {
      wx.hideLoading();
      wx.showToast({
        title: '支付失败',
      });
      return;
    }
    const { pay, uuid } = res.result;
    await wx.requestPayment({
      ...pay,
    });
    clientEnd();
    wx.hideLoading();
    await this.callFunction({ name: 'payCallback' });
    const order = await this.callFunction({
      name: 'afterPay',
      data: {
        skuId,
        num: productNum,
        payUid: uuid,
      },
    });

    this.lotteryDialogInfo = order.result;
    this.lotteryDialogVisible = true;
    allEnd(order.result);
  }
}

export default new Sku();
