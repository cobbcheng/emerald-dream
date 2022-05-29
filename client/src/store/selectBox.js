import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class SelectBox {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }

  @observable list = [];

  @action.bound
  getBoxList(id) {
    this.callFunction({
      name: 'getBoxList',
      data: {
        id,
      },
    }).then((res) => {
      this.list = res.result.map((box) => {
        const all = box.items.reduce((acc, cur) => {
          return acc + cur.left;
        }, 0);
        return {
          ...box,
          all,
        };
      });
    });
  }
}

export default new SelectBox();
