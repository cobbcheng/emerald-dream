import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import CommonCheckbox from '../../components/CommonCheckbox';
import './index.less';

export default class Ship extends Component {
  state = {
    allChecked: false,
    checkedList: [],
  };

  onChange = () => {
    this.setState({
      allChecked: !this.state.allChecked,
    });
  };

  render() {
    return (
      <View className="ship">
        <View className="header">
          <View className="header-icon"></View>
          <View className="header-info">
            <View className="header-title">龙珠大满贯 18955544237</View>
            <View className="header-desc">上海市徐汇区田林路142号，上海市徐汇区</View>
          </View>
          <View className="header-tag">默认</View>
        </View>
        <View className="select">
          <CommonCheckbox checked={this.state.allChecked} onChange={this.onChange}></CommonCheckbox>
          <View>已选 2/10</View>
        </View>
        <View className="list">
          <View className="item">
            <View className="item-pic">
              <Image
                className="item-img"
                src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/cloudbase-cms/upload/2022-04-04/2jj3ubjaougzm5nglxa70p3bvxfpum7w_.jpeg?sign=0616876bc47705c73d08cf1895ce2c0b&t=1649042184"
              ></Image>
            </View>
            <View className="item-info">
              <View className="item-info-flex">
                <View className="item-title">A赏 龙珠划分天下</View>
                <View className="item-type">龙珠 vol. 100</View>
                <View className="item-time">2022-3-19 12:33:33</View>
              </View>
              <View className="item-check">
                <CommonCheckbox></CommonCheckbox>
              </View>
            </View>
          </View>
        </View>
        <View className="button">立即发货</View>
      </View>
    );
  }
}
