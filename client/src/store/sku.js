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

  get notEmptyBoxes() {
    return this.boxes.filter((box) => {
      return box.left > 0;
    });
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
}

export default new Sku();
