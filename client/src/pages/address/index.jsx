import { Component } from 'react';
import { View, Button, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import './index.less';

export default class Address extends Component {
  render() {
    return (
      <View className="address">
        <View className="header">
          <View className="header-icon"></View>
          <View className="header-info">
            <View className="header-title">龙珠大满贯 18955544237</View>
            <View className="header-desc">上海市徐汇区田林路142号，上海市徐汇区</View>
          </View>
          <View className="header-tag">默认</View>
        </View>

        <View className="header">
          <View className="header-icon"></View>
          <View className="header-info">
            <View className="header-title">龙珠大满贯 18955544237</View>
            <View className="header-desc">上海市徐汇区田林路142号，上海市徐汇区</View>
          </View>
          <View className="header-tag">默认</View>
        </View>

        <View className="button" onClick={() => wx.navigateTo({ url: '/pages/addressEdit/index' })}>
          添加收货地址
        </View>
      </View>
    );
  }
}
