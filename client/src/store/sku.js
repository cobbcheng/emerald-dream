import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Sku {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable list = [];

  @action.bound
  getBoxList(id) {
    this.skuId = id;
    this.callFunction({
      // 云函数名称
      name: 'getSkuDetail',
      // 传给云函数的参数
      data: {
        id,
      },
    }).then((res) => {
      console.log(res);
    });
  }

  @action.bound
  async getBox() {
    console.log('getBox', this);
    const res = await this.db.runTransaction(this.runTr);
    return res;
    // try {
    //   const res = await this.db.runTransaction(this.runTr);
    //   return res;
    // } catch (e) {
    //   return {
    //     boxes: [],
    //     stocks: [],
    //   };
    // }
  }

  @action.bound
  async runTr(tr) {
    const id = this.skuId;
    const boxes = await tr
      .collection('box')
      .where({
        sku_id: id,
      })
      .get();

    const map = boxes.data.map((box) => box._id);
    const _ = this.db.command;
    const stocks = await tr.collection('stock').where({
      box_id: _.in(map),
    });

    return {
      boxes,
      stocks,
    };
  }
}

export default new Sku();
