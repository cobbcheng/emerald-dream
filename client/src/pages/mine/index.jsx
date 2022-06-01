import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';
@inject('store')
@observer
export default class Sku extends Component {
  openUrl = (url) => {
    wx.navigateTo({
      url: `/pages/webview/index?url=${url}`,
    });
  };
  render() {
    const { userInfo } = this.props.store.userInfo;
    return (
      <View className="mine">
        <View className="header">
          <View className="user">
            <View className="avatar">
              <Image src={userInfo.avatarUrl}></Image>
            </View>
            <View className="username">{userInfo.nickName}</View>
          </View>
          <Image
            className="link"
            src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/btn_group.png"
          ></Image>
        </View>

        <View className="button">
          <View className="item" onClick={() => wx.navigateTo({ url: '/pages/address/index' })}>
            发货管理 <View className="arrow-icon"></View>
          </View>
          <View className="item">
            联系客服 <View className="arrow-icon"></View>
          </View>
          <View className="item">
            用户协议 <View className="arrow-icon"></View>
          </View>
          <View
            className="item"
            onClick={() => this.openUrl('https://yifanshang-8g5d7nxddf660e3e-1310253199.tcloudbaseapp.com/h5/#/pp')}
          >
            隐私政策 <View className="arrow-icon"></View>
          </View>
        </View>
      </View>
    );
  }
}
