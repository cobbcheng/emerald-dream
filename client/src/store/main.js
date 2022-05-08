import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class MainPage {
  constructor() {
    this.db = getCloud().db;
  }
  @observable spuList = [];
  @observable banner = [];

  @action.bound
  loadList() {
    this.db
      .collection('yfs_spu')
      .get()
      .then((res) => {
        this.spuList = res.data;
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
