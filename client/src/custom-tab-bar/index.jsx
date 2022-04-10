import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class TabBar extends Component {
  get home() {
    const { current } = this.props.store.global;
    if (current === 0) {
      return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_home.png';
    }
    return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_home_gray.png';
  }

  get bag() {
    const { current } = this.props.store.global;
    if (current === 1) {
      return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_bag.png';
    }

    return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_bag_gray.png';
  }

  get me() {
    const { current } = this.props.store.global;
    if (current === 2) {
      return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_me.png?sign=887505b64146f76f0071b5a2956b0a74&t=1649596487';
    }

    return 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/main_btn_me_gray.png?sign=fd0d3023b6cd82bc5f2623456bfb5ba4&t=1649584616';
  }

  handleClick(current) {
    const path = ['/pages/index/index', '/pages/package/index', '/pages/mine/index'];
    this.props.store.global.tab(current);
    wx.switchTab({ url: path[current] });
  }

  render() {
    return (
      <View className="tab">
        <View className="main">
          <View
            className="tab-bar"
            onClick={() => this.handleClick(0)}
            style={{ backgroundImage: `url(${this.home})` }}
          ></View>
          <View
            className="tab-bar"
            onClick={() => this.handleClick(1)}
            style={{ backgroundImage: `url(${this.bag})` }}
          ></View>
          <View
            className="tab-bar"
            onClick={() => this.handleClick(2)}
            style={{ backgroundImage: `url(${this.me})` }}
          ></View>
        </View>
      </View>
    );
  }
}
