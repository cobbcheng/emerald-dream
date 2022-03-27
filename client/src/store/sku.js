import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Sku {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable list = [];
  @observable prizeList = [];

  @action.bound
  getBoxList(id) {
    this.skuId = id;
    this.db
      .collection('yfs_box')
      .where({
        skuId: id,
      })
      .get()
      .then((res) => {
        this.list = res.data;
        console.log(res);
      });
  }

  @action.bound
  getPrizeList(boxId) {
    this.boxId = boxId;
    this.db
      .collection('yfs_prize')
      .where({
        boxId: boxId,
      })
      .get()
      .then((res) => {
        this.prizeList = res.data;
        console.log(res);
      });
  }
}

export default new Sku();
