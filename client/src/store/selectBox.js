import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class SelectBox {
  constructor() {
    this.db = getCloud().db;
  }

  @observable list = [];
}

export default new SelectBox();
