import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class MainPage {
  constructor() {
    this.db = getCloud().db;
    this.callFunction = getCloud().callFunction;
  }
  @observable spuList = [];
  @observable banner = [];

  @action.bound
  loadList() {
    this.callFunction({
      name: 'spuList',
      data: {},
    }).then((res) => {
      this.spuList = res.result;
    });
  }

  @action.bound
  loadBanner() {
    this.db
      .collection('yfs_banner')
      .where({})
      .limit(1)
      .get()
      .then((res) => {
        this.banner = res.data;
      });
  }
}

export default new MainPage();
