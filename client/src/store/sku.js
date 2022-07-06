import { observable, action, computed, observe } from 'mobx';
import { getCloud } from '@/helper/cloud';
import dayjs from 'dayjs';

class Sku {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
    observe(this, 'recordVisible', ({ newValue }) => {
      if (newValue) {
        console.log('recordVisible', newValue);
        this.getRecordList({ reset: true });
      }
    });
  }

  @observable boxes = [];
  @observable prizeList = [];
  @observable detail = {};
  @observable currentBoxId = '';

  // 中奖记录
  @observable recordVisible = false;
  @observable recordList = [];
  @observable recordPaging = 1;

  // 中奖弹窗信息
  @observable lotteryDialogVisible = false;
  @observable lotteryDialogInfo = [];

  @computed get notEmptyBoxes() {
    return this.boxes.filter((box) => {
      return box.left > 0;
    });
  }
  @computed get prizeStat() {
    const total = this.prizeList.reduce((t, item) => {
      return t + item.total;
    }, 0);
    const left = this.prizeList.reduce((acc, cur) => {
      return acc + cur.left;
    }, 0);

    return {
      total: total - 1,
      left: left <= 0 ? 0 : left - 1,
    };
  }

  @action.bound
  toggleRecordVisible(visible) {
    this.recordVisible = visible;
  }

  @action.bound
  getRecordList({ reset }) {
    if (reset === true) {
      this.recordPaging = 1;
      this.recordList = [];
    }
    this.callFunction({
      name: 'getPrizeRecord',
      data: {
        page: this.recordPaging,
        skuId: this.currentBoxId,
      },
    }).then((res) => {
      this.recordList.push(
        ...res.result.map((v) => {
          v._createTime = dayjs(v._createTime).format('YYYY-MM-DD HH:mm:ss');
          return v;
        }),
      );
      this.recordPaging += 1;
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
    return this.callFunction({
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
      return Promise.resolve();
    });
  }

  @action.bound
  async pay({ payTotal, productNum, skuId, clientEnd = () => {}, allEnd = () => {} }) {
    wx.showLoading({
      title: '支付中',
    });

    try {
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

      await this.callFunction({ name: 'payCallback' });
      const order = await this.callFunction({
        name: 'afterPay',
        data: {
          skuId,
          num: productNum,
          payUid: uuid,
          payTotal,
        },
      });
      wx.hideLoading();

      this.lotteryDialogInfo = order.result;
      this.lotteryDialogVisible = true;
      allEnd(order.result);
    } catch (e) {
      wx.hideLoading();
      wx.showToast({
        title: '支付失败',
      });
    }
  }

  @action.bound
  setCurrentBoxId(id) {
    console.log('setCurrentBoxId', id);
    this.currentBoxId = id;
  }
}

export default new Sku();
