import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Package {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }
  @observable pkgList = [];

  @action.bound
  getPkgList(data = {}) {
    this.callFunction({
      name: 'myPrize',
      data,
    }).then((res) => {
      this.pkgList = res.result.list.map((item) => {
        return {
          ...item,
          item: item.item[0],
        };
      });
    });
  }

  @action.bound
  setAllCheck(isChecked) {
    this.pkgList = this.pkgList.map((item) => {
      item.checked = isChecked;
      return item;
    });
  }

  @action.bound
  setItemCheck(id) {
    this.pkgList = this.pkgList.map((item) => {
      if (item._id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
  }

  @action.bound
  async shipNow() {
    const shipPkg = this.pkgList.filter((item) => item.checked).map((t) => t._id);
    const res = await this.callFunction({
      name: 'shipPrize',
      data: {
        list: shipPkg,
      },
    });
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
}

export default new Package();
