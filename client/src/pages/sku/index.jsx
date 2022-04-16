import { Component } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import './index.less';

@inject('store')
@observer
export default class Sku extends Component {
  $instance = getCurrentInstance();

  componentDidMount() {
    const { id } = this.$instance.router.params;
    const { getBoxList } = this.props.store.sku;
    getBoxList(id);
  }

  getPrize(boxId) {
    const { getPrizeList } = this.props.store.sku;
    getPrizeList(boxId);
  }

  render() {
    const { list } = this.props.store.sku;
    return (
      // <>
      //   <View>
      //     {list.map((item) => (
      //       <Button onClick={() => this.getPrize(item._id)} key={item._id}>
      //         第{item.number}箱
      //       </Button>
      //     ))}
      //   </View>
      // </>
      <View className="sku">
        <View className="header">
          <View className="header-pic"></View>
          <View className="btn">
            <View className="btn-record"></View>
            <View className="btn-price">98</View>
          </View>
        </View>
        <View className="line"></View>
        <View className="tab">
          <View className="tab-btn tab-pre"></View>
          <View className="tab-info">
            第 <Text className="tab-info-number">1</Text>/246 箱 &nbsp; 赏品余量&nbsp;
            <Text className="tab-info-number">33</Text>/80
          </View>
          <View className="tab-btn tab-next"></View>
        </View>

        <View className="list"></View>

        <View className="chong"></View>

        <View className="bottom"></View>
      </View>
    );
  }
}
