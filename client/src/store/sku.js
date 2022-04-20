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

  @action.bound
  getSpuDetail(id) {
    this.callFunction({
      name: 'getSpuDetail',
      data: {
        id,
      },
    }).then((res) => {
      const { detail, boxes } = res.result;
      this.detail = detail;
      this.boxes = boxes;
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
      console.log(res);
    });
  }
}

export default new Sku();
