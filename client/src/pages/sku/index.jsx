import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import { Popup, Checkbox } from '@antmjs/vantui';
import './index.less';

@inject('store')
@observer
export default class Sku extends Component {
  $instance = getCurrentInstance();

  state = {
    showPopup: false,
    checked: false,
    boxIndex: 1,
  };

  componentDidMount() {
    const { id } = this.$instance.router.params;
    const { getSpuDetail } = this.props.store.sku;
    getSpuDetail(id);
  }

  getPrize(boxId) {
    const { getPrizeList } = this.props.store.sku;
    getPrizeList(boxId);
  }

  onClose = () => {
    this.setState({ showPopup: false });
  };

  onShow = () => {
    this.setState({ showPopup: true });
  };

  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { detail, boxes } = this.props.store.sku;
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
            <View className="btn-price">{detail.originPrice}</View>
          </View>
        </View>
        <View className="line"></View>
        <View className="tab">
          <View className="tab-btn tab-pre"></View>
          <View className="tab-info">
            第 <Text className="tab-info-number">1</Text>/{boxes.length} 箱 &nbsp; 赏品余量&nbsp;
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
            <View className="chong-item chong-1" onClick={this.onShow}></View>
            <View className="chong-item chong-3"></View>
            <View className="chong-item chong-5"></View>
          </View>

          <View className="bottom">
            <View className="bottom-change"></View>
            <View className="bottom-all"></View>
          </View>
        </View>

        <Popup
          show={this.state.showPopup}
          position="bottom"
          style="background-color: transparent;"
          onClose={this.onClose}
        >
          <View className="popup-top"></View>
          <View className="popup-back">
            <View className="popup-header">
              <View className="popup-title">购买 龙珠 划分天下的超决战（第一箱）</View>
              <View className="popup-hide" onClick={this.onClose}>
                取消
              </View>
            </View>
            <View className="popup-banner">
              <Image
                className="popup-banner-pic"
                src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/pic_01.png?sign=5de9eb67c53e1a6cb56c1ac19c97e691&t=1650433208"
              ></Image>
            </View>
            <View className="popup-info">
              <View className="popup-info-left">
                单价 <Text className="popup-highlight">59</Text>元 数量 <Text className="popup-highlight">x5</Text>
              </View>
              <View className="popup-info-right">
                总计 <Text className="popup-price">295</Text> 元
              </View>
            </View>
            <View className="popup-protocol">
              <Checkbox
                value={this.state.checked}
                checkedColor="#efd80e"
                shape="square"
                onChange={this.onChange}
              ></Checkbox>
              同意 <Text className="popup-highlight">《用户购买协议》</Text>、
              <Text className="popup-highlight">《发货通知》</Text>
            </View>
            <View className="popup-button">微信支付</View>
            <View className="popup-bottom">
              如遇到商品数量不足时，金额会自动退款，退款时间可能有几秒延迟，请耐心等待
            </View>
          </View>
        </Popup>
      </View>
    );
  }
}
