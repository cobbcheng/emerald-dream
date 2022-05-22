import { Component } from 'react';
import { View, Button, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import { If } from 'react-if';
import './index.less';

@observer
@inject('store')
export default class Address extends Component {
  componentDidMount() {
    this.props.store.address.getAddressList();
  }

  setDefault = (addressId) => {
    const { openid } = this.props.store.userInfo;
    this.props.store.address.setDefaultAddress({ id: openid, addressId });
  };

  render() {
    const { addressList } = this.props.store.address;
    return (
      <View className="address">
        {addressList.map((address) => (
          <View className="header" onClick={() => this.setDefault(address._id)}>
            <View className="header-icon"></View>
            <View className="header-info">
              <View className="header-title">
                {address.addressName} {address.addressPhone}
              </View>
              <View className="header-desc">{address.address}</View>
            </View>
            <If condition={address.isDefault}>
              <View className="header-tag">默认</View>
            </If>
          </View>
        ))}

        <View className="button" onClick={() => wx.navigateTo({ url: '/pages/addressEdit/index' })}>
          添加收货地址
        </View>
      </View>
    );
  }
}
