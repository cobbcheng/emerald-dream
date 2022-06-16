import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import CommonCheckbox from '@/components/CommonCheckbox';
import './index.less';

@inject('store')
@observer
export default class PricePopup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    checked: false,
  };

  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  openUrl = (url) => {
    wx.navigateTo({
      url: `/pages/webview/index?url=${url}`,
    });
  };

  pay = () => {
    const { pay, prizeStat } = this.props.store.sku;
    const { popupState, currentBoxId } = this.props;
    const { left } = prizeStat;

    if (!this.state.checked) {
      wx.showToast({
        title: '请同意用户购买协议',
        icon: 'none',
      });
      return;
    }

    if (left < popupState.num) {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
      });
      return;
    }
    pay({
      payTotal: popupState.price * popupState.num,
      productNum: popupState.num,
      skuId: currentBoxId,
      clientEnd: () => {
        this.props.onClose();
      },
      allEnd: this.props.loadData,
    });
  };

  render() {
    const { popupState } = this.props;
    return (
      <>
        <View className="popup-top" onClick={this.props.onClose}></View>
        <View className="popup-back">
          <View className="popup-header">
            <View className="popup-title">购买 {popupState.name}</View>
            <View className="popup-hide" onClick={this.props.onClose}>
              取消
            </View>
          </View>
          <View className="popup-banner">
            <Image className="popup-banner-pic" src={popupState.img}></Image>
          </View>
          <View className="popup-info">
            <View className="popup-info-left">
              单价 <Text className="popup-highlight">{popupState.price}</Text>元 数量{' '}
              <Text className="popup-highlight">x{popupState.num}</Text>
            </View>
            <View className="popup-info-right">
              总计 <Text className="popup-price">{popupState.price * popupState.num}</Text> 元
            </View>
          </View>
          <View className="popup-protocol">
            <CommonCheckbox checked={this.state.checked} onChange={this.onChange}></CommonCheckbox> 同意{' '}
            <Text
              className="popup-highlight"
              onClick={() => this.openUrl('https://yifanshang-8g5d7nxddf660e3e-1310253199.tcloudbaseapp.com/h5/#/ua')}
            >
              《用户购买协议》
            </Text>
            、
            <Text
              className="popup-highlight"
              onClick={() => this.openUrl('https://yifanshang-8g5d7nxddf660e3e-1310253199.tcloudbaseapp.com/h5/#/pp')}
            >
              《隐私政策》
            </Text>
            <View className="check-range" onClick={this.onChange}></View>
          </View>
          <View className="popup-button" onClick={this.pay}>
            微信支付
          </View>
          <View className="popup-bottom">如遇到商品数量不足时，金额会自动退款，退款时间可能有几秒延迟，请耐心等待</View>
        </View>
      </>
    );
  }
}
