import { observable, action } from 'mobx';
import { getCloud } from '@/helper/cloud';

class Address {
  constructor() {
    this.db = getCloud().db;
  }
  @observable addressList = [];
  @observable defaultAddressId = '';

  @action.bound
  addNewAddress(address) {
    return this.db.collection('yfs_address').add({
      data: {
        ...address,
        _createTime: Date.now(),
        _updateTime: Date.now(),
      },
    });
  }

  @action.bound
  getAddressList(openid) {
    this.db
      .collection('yfs_address')
      .where({ openid: openid })
      .get()
      .then((res) => {
        this.addressList = res.data;
        this.getDefaultAddress(openid);
        return Promise.resolve();
      });
  }

  @action.bound
  async setDefaultAddress({ id, addressId }) {
    const res = await this.db
      .collection('yfs_default')
      .where({
        _id: id,
      })
      .get();

    if (res.data[0]) {
      await this.db.collection('yfs_default').doc(id).update({
        data: {
          addressId,
        },
      });
    } else {
      await this.db.collection('yfs_default').add({
        data: {
          _id: id,
          addressId,
        },
      });
    }
  }

  @action.bound
  getDefaultAddress(id) {
    this.db
      .collection('yfs_default')
      .where({
        _id: id,
      })
      .get()
      .then((res) => {
        const data = res.data[0];
        this.addressList = this.addressList.map((item) => {
          if (item._id === data.addressId) {
            item.isDefault = true;
          }
          return item;
        });
      });
  }
}

export default new Address();
