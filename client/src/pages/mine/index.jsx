import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';

@inject('store')
@observer
export default class Sku extends Component {
  render() {
    return (
      <View className="mine">
        <View className="header">
          <View className="user">
            <View className="avatar">
              <Image src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/cloudbase-cms/upload/2022-04-04/2jj3ubjaougzm5nglxa70p3bvxfpum7w_.jpeg?sign=0616876bc47705c73d08cf1895ce2c0b&t=1649042184"></Image>
            </View>
            <View className="username">温柔</View>
          </View>
          <Image
            className="link"
            src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/btn_group.png"
          ></Image>
        </View>

        <View className="button">
          <View className="item">
            发货管理 <View className="arrow-icon"></View>
          </View>
          <View className="item">
            联系客服 <View className="arrow-icon"></View>
          </View>
          <View className="item">
            用户协议 <View className="arrow-icon"></View>
          </View>
          <View className="item">
            隐私政策 <View className="arrow-icon"></View>
          </View>
        </View>
      </View>
    );
  }
}
