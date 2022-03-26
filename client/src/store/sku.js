import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Sku {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable list = [];
  @observable stockList = [];

  @action.bound
  getBoxList(id) {
    this.db
      .collection('box')
      .where({
        sku_id: id,
      })
      .get()
      .then((res) => {
        this.list = res.data;
      });
  }

  @action.bound
  getStockList(boxId) {
    this.db
      .collection('stock')
      .where({
        box_id: boxId,
      })
      .get()
      .then((res) => {
        this.stockList = res.data;
      });
  }
}

export default new Sku();
