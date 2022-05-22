import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';

@inject('store')
@observer
export default class Package extends Component {
  state = {
    tab: 'all',
  };

  navToShip = () => {
    wx.navigateTo({
      url: '/pages/ship/index',
    });
  };

  tab = (tab) => {
    this.setState({ tab });
  };

  componentDidMount() {
    this.props.store.pkg.getPkgList();
  }

  get list() {
    const { pkgList } = this.props.store.pkg;
    return this.state.tab === 'all' ? pkgList : pkgList.filter((pkg) => pkg.status === 0);
  }

  get allBtn() {
    return this.state.tab === 'all'
      ? 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/tab_btn_all.png'
      : 'cloud://yifanshang-8g5d7nxddf660e3e.7969-yifanshang-8g5d7nxddf660e3e-1310253199/ui/tab_btn_all_gray.png';
  }

  get notBtn() {
    return this.state.tab === 'not'
      ? 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/tab_btn_not.png'
      : 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/tab_btn_not_gray.png';
  }

  render() {
    const stat = ['未发货', '已发货', '发货失败'];
    return (
      <View className="package">
        <View className="header">
          <View className="header-tab">
            <Image className="header-tab-item" onClick={() => this.tab('all')} src={this.allBtn}></Image>
            <Image className="header-tab-item header-tab-not" onClick={() => this.tab('not')} src={this.notBtn}></Image>
          </View>

          <View className="header-pack" onClick={this.navToShip}></View>
        </View>

        <View className="list">
          {this.list.map((pkg) => (
            <View className="item">
              <View className="item-pic">
                <Image className="item-img" src={pkg.item.pic}></Image>
              </View>
              <View className="item-info">
                <View className="item-title">{pkg.item.name}</View>
                <View className="item-type">{pkg.item.level}赏</View>
                {/* <View className="item-time">{pkg.item._createTime}</View> */}
                <View className="item-status">{stat[pkg.status]}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
