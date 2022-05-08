import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';

@inject('store')
@observer
export default class Package extends Component {
  navToShip = () => {
    wx.navigateTo({
      url: '/pages/ship/index',
    });
  };

  componentDidMount() {
    this.props.store.pkg.getPkgList();
  }
  render() {
    const { pkgList } = this.props.store.pkg;
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

          <View className="header-pack" onClick={this.navToShip}></View>
        </View>

        <View className="list">
          {pkgList.map((pkg) => (
            <View className="item">
              <View className="item-pic">
                <Image className="item-img" src={pkg.item.pic}></Image>
              </View>
              <View className="item-info">
                <View className="item-title">{pkg.item.name}</View>
                <View className="item-type">{pkg.item.level}赏</View>
                {/* <View className="item-time">{pkg.item._createTime}</View> */}
                <View className="item-status">{pkg.status === 0 ? '未发货' : '已发货'}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
