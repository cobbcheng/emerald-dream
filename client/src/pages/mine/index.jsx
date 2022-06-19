import { Component } from 'react';
import { View, Image, Button } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCloud } from '@/helper/cloud';
import './index.less';
@inject('store')
@observer
export default class Mine extends Component {
  state = {
    src: '',
  };

  componentDidMount() {
    const { db } = getCloud();
    db.collection('yfs_config')
      .limit(1)
      .get()
      .then((res) => {
        const data = res.data[0];
        this.setState({
          src: data.group_qr,
        });
      });
  }

  showQr = () => {
    wx.previewImage({
      current: this.state.src,
      urls: [this.state.src],
    });
  };

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
          <View className="link" onClick={this.showQr}></View>
        </View>

        <View className="button">
          <View className="item" onClick={() => wx.navigateTo({ url: '/pages/address/index' })}>
            地址管理 <View className="arrow-icon"></View>
          </View>
          <Button className="item" open-type="contact">
            联系客服 <View className="arrow-icon"></View>
          </Button>
          <View
            className="item"
            onClick={() => this.openUrl('https://yifanshang-8g5d7nxddf660e3e-1310253199.tcloudbaseapp.com/h5/#/ua')}
          >
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
