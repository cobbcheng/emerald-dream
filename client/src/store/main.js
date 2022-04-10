import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class MainPage {
  constructor() {
    this.db = getCloud().db;
  }
  @observable skuList = [];

  @action.bound
  loadList() {
    this.db
      .collection('yfs_spu')
      .get()
      .then((res) => {
        this.skuList = res.data;
      });
  }
}

export default new MainPage();
