import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import CommonCheckbox from '@/components/CommonCheckbox';
import './index.less';

@inject('store')
@observer
export default class BoxSelect extends Component {
  state = {
    checked: false,
  };

  id = getCurrentInstance().id;

  checkChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <View className="box-select">
        <View className="check" onClick={this.checkChange}>
          <CommonCheckbox checked={this.state.checked} onChange={this.checkChange}></CommonCheckbox>
          <View>不看售罄</View>
        </View>
        <View className="sort">
          <View className="sort-item">
            余量 <View className="sort-icon"></View>
          </View>
          <View className="sort-item">
            箱号 <View className="sort-icon"></View>
          </View>
        </View>
        <View className="list">
          <View className="box">
            <View className="box-left">
              <View className="box-icon"></View>
              <View className="box-stat">剩余88张</View>
            </View>
            <View className="box-right">
              <View className="box-item">A 2/2</View>
              <View className="box-item">B 2/2</View>
              <View className="box-item">C 2/2</View>
              <View className="box-item">D 2/2</View>
              <View className="box-item">E 2/2</View>
              <View className="box-item">F 2/2</View>
              <View className="box-item">G 2/2</View>
              <View className="box-item">H 2/2</View>
              <View className="box-item">I 2/2</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
