import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
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

        <View className="list">
          <View className="item">
            <View className="item-pic">
              <Image
                className="item-pic-detail"
                src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/cloudbase-cms/upload/2022-04-04/2jj3ubjaougzm5nglxa70p3bvxfpum7w_.jpeg?sign=0616876bc47705c73d08cf1895ce2c0b&t=1649042184"
              ></Image>
              <View className="item-left">12/24</View>
            </View>
            <View className="item-info">A赏 大龙山一日游</View>
          </View>
        </View>

        <View className="fixed">
          <View className="chong">
            <View className="chong-item chong-1"></View>
            <View className="chong-item chong-3"></View>
            <View className="chong-item chong-5"></View>
          </View>

          <View className="bottom">
            <View className="bottom-change"></View>
            <View className="bottom-all"></View>
          </View>
        </View>
      </View>
    );
  }
}
