import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Package {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }
  @observable pkgList = [];
  @observable pkgPaging = 1;

  @observable shipList = [];
  @observable shipPaging = 1;

  @observable postageDialogVisible = false;

  get productList() {
    return this.shipList.filter((item) => item.checked).map((t) => t._id);
  }

  @action.bound
  resetShipList() {
    this.shipList = [];
    this.shipPaging = 1;
  }

  @action.bound
  getShipList() {
    this.callFunction({
      name: 'myPrize',
      data: {
        page: this.shipPaging,
        status: 0,
      },
    }).then((res) => {
      this.shipPaging += 1;
      this.shipList.push(
        ...res.result.list.map((item) => {
          return {
            ...item,
            checked: false,
            item: item.item[0],
          };
        }),
      );
    });
  }

  @action.bound
  getPkgList(config = {}) {
    this.callFunction({
      name: 'myPrize',
      data: {
        page: this.pkgPaging,
        ...config,
      },
    }).then((res) => {
      this.pkgPaging += 1;
      this.pkgList.push(
        ...res.result.list.map((item) => {
          return {
            ...item,
            item: item.item[0],
          };
        }),
      );
    });
  }

  @action.bound
  setAllCheck(isChecked) {
    this.shipList = this.shipList.map((item) => {
      item.checked = isChecked;
      return item;
    });
  }

  @action.bound
  setItemCheck(id) {
    this.shipList = this.shipList.map((item) => {
      if (item._id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
  }

  @action.bound
  async shipNow({ skip = false }) {
    const shipPkg = this.productList;
    if (shipPkg.length < 5 && !skip) {
      this.postageDialogVisible = true;
      return;
    }

    const res = await this.callFunction({
      name: 'shipPrize',
      data: {
        list: shipPkg,
        skip,
      },
    });

    if (res.result === 'postage') {
      this.postageDialogVisible = true;
      return;
    }

    if (res.result === 'success') {
      wx.showToast({
        title: '发货成功',
      });
      this.pkgList = this.pkgList.map((item) => {
        if (shipPkg.includes(item._id)) {
          item.status = 1;
        }
        return item;
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }
  }

  @action.bound
  hidePostageDialog() {
    this.postageDialogVisible = false;
  }

  @action.bound
  async payPostage({ callback = () => {} }) {
    wx.showLoading({
      title: '支付中',
    });
    const productList = this.productList;
    try {
      const res = await this.callFunction({
        name: 'doPay',
        data: { payTotal: 18, body: '一番赏支付-邮费', payType: 'postage', productList },
      });
      if (res.result.code !== 0) {
        wx.hideLoading();
        wx.showToast({
          title: '支付失败',
        });
        return;
      }
      const { pay } = res.result;

      await wx.requestPayment({
        ...pay,
      });
      wx.hideLoading();
      callback();
      await this.callFunction({ name: 'payCallback', data: { type: 'postage' } });
      this.shipNow({ skip: true });
    } catch (e) {
      wx.hideLoading();
      wx.showToast({
        title: '支付失败',
      });
    }
  }
}

export default new Package();
