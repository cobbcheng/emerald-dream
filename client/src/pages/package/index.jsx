import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';

@inject('store')
@observer
export default class Package extends Component {
  render() {
    return (
      <View className="package">
        <View className="header">
          <View className="header-tab">
            <Image
              className="header-tab-item"
              src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/tab_btn_all.png"
            ></Image>
            <Image
              className="header-tab-item header-tab-not"
              src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/tab_btn_not_gray.png"
            ></Image>
          </View>

          <View className="header-pack"></View>
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
              <View className="item-title">A赏 龙珠划分天下</View>
              <View className="item-type">龙珠 vol. 100</View>
              <View className="item-time">2022-3-19 12:33:33</View>
              <View className="item-status">已发货</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
