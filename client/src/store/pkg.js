import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Package {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }
  @observable pkgList = [];

  @action.bound
  getPkgList() {
    this.callFunction({ name: 'myPrize' }).then((res) => {
      this.pkgList = res.result.list.map((item) => {
        return {
          ...item,
          item: item.item[0],
        };
      });
    });
  }
}

export default new Package();
