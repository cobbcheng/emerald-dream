import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import { Field } from '@antmjs/vantui';
import './index.less';

@inject('store')
@observer
export default class AddressEdit extends Component {
  state = {
    name: '',
    phone: '',
    address: '',
  };

  nameChange = (e) => {
    this.setState({
      name: e.detail,
    });
  };

  phoneChange = (e) => {
    this.setState({
      phone: e.detail,
    });
  };

  addressChange = (e) => {
    this.setState({
      address: e.detail,
    });
  };

  save = () => {
    if (this.state.name === '') {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (this.state.phone === '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (this.state.address === '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    this.props.store.address
      .addNewAddress({
        openid: this.props.store.userInfo.openid,
        addressName: this.state.name,
        addressPhone: this.state.phone,
        address: this.state.address,
      })
      .then((res) => {
        const { _id } = res;
        this.props.store.address.setDefaultAddress({ addressId: _id, id: this.props.store.userInfo.openid });
        this.props.store.address.getAddressList();
        wx.showToast({
          title: '保存成功',
        });

        setTimeout(() => {
          this.cancel();
        }, 200);
      });
  };

  cancel = () => {
    this.setState({
      name: '',
      phone: '',
      address: '',
    });

    wx.navigateBack();
  };

  render() {
    return (
      <View className="edit">
        <View className="header">收货人</View>
        <View>
          <Field
            onChange={this.nameChange}
            value={this.state.name}
            style="background: #1f1f1f;border: 1px solid #fff488;color: #ffffff;"
          ></Field>
        </View>

        <View className="header">手机号码</View>
        <View>
          <Field
            onChange={this.phoneChange}
            value={this.state.phone}
            style="background: #1f1f1f;border: 1px solid #fff488;color: #ffffff;"
          ></Field>
        </View>

        <View className="header">详细地址</View>
        <View>
          <Field
            onChange={this.addressChange}
            value={this.state.address}
            style="background: #1f1f1f;border: 1px solid #fff488;color: #ffffff;"
            autosize
            type="textarea"
          ></Field>
        </View>

        <View className="button" onClick={this.save}>
          保存
        </View>
      </View>
    );
  }
}
