import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import CommonCheckbox from '../../components/CommonCheckbox';
import './index.less';

@inject('store')
@observer
export default class Ship extends Component {
  state = {
    allChecked: false,
    checkedList: [],
  };

  onChange = () => {
    this.setState(
      {
        allChecked: !this.state.allChecked,
      },
      () => {
        this.props.store.pkg.setAllCheck(this.state.allChecked);
      },
    );
  };

  componentDidMount() {
    this.props.store.pkg.getPkgList({ status: 0 });
    this.props.store.address.getAddressList();
  }

  get defaultAddress() {
    const { addressList } = this.props.store.address;
    const defaultAddress = addressList.find((item) => item.isDefault);
    if (defaultAddress) {
      return defaultAddress;
    } else {
      return {};
    }
  }

  render() {
    const { pkgList, setItemCheck, shipNow } = this.props.store.pkg;

    return (
      <View className="ship">
        <View className="header">
          <View className="header-icon"></View>
          <View className="header-info">
            <View className="header-title">
              {this.defaultAddress.addressName} {this.defaultAddress.addressPhone}
            </View>
            <View className="header-desc">{this.defaultAddress.address}</View>
          </View>
          <View className="header-tag">默认</View>
        </View>
        <View className="select">
          <CommonCheckbox checked={this.state.allChecked} onChange={this.onChange}></CommonCheckbox>
          <View>已选 2/10</View>
        </View>
        <View className="list">
          {pkgList.map((pkg) => (
            <View className="item" onClick={() => setItemCheck(pkg._id)}>
              <View className="item-pic">
                <Image className="item-img" src={pkg.item.pic}></Image>
              </View>
              <View className="item-info">
                <View className="item-info-flex">
                  <View className="item-title">{pkg.item.name}</View>
                  <View className="item-type">{pkg.item.level}赏</View>
                  {/* <View className="item-time">2022-3-19 12:33:33</View> */}
                </View>
                <View className="item-check">
                  <CommonCheckbox checked={pkg.checked}></CommonCheckbox>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View className="button" onClick={shipNow}>
          立即发货
        </View>
      </View>
    );
  }
}
