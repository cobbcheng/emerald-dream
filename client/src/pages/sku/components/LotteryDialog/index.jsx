import { Component } from 'react';
import { View, Image, ScrollView } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { Overlay } from '@antmjs/vantui';
import { If, Then } from 'react-if';
import './index.less';

@inject('store')
@observer
export default class LotteryDialog extends Component {
  get dialogImg() {
    const { lotteryDialogInfo } = this.props.store.sku;
    const sorted = lotteryDialogInfo.sort((s, t) => {
      const a = s.level.toLowerCase();
      const b = t.level.toLowerCase();
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });

    if (sorted.length === 0) {
      return '';
    }
    return sorted[sorted.length - 1].pic;
  }

  get imgLength() {
    const { lotteryDialogInfo } = this.props.store.sku;
    return lotteryDialogInfo.length;
  }

  render() {
    const { lotteryDialogVisible, hideLotteryDialog, lotteryDialogInfo } = this.props.store.sku;
    return (
      <Overlay show={lotteryDialogVisible}>
        <View>
          <View className="lottery-title">
            <Image
              className="lottery-title-img"
              src="https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/txt_get.png?sign=8d1c025dce344898c7ee5e854d6b1da4&t=1651668227"
            ></Image>
          </View>
          <View className="lottery-main">
            <If condition={this.imgLength > 3}>
              <Then>
                <ScrollView scrollY scrollWithAnimation className="lottery-main-box">
                  {lotteryDialogInfo.map((item) => (
                    <Image className="lottery-main-img" src={item.pic}></Image>
                  ))}
                </ScrollView>
              </Then>
            </If>
            <If condition={this.imgLength <= 3 && this.imgLength > 1}>
              <Then>
                <View className="lottery-main-box lottery-main-flex">
                  {lotteryDialogInfo.map((item) => (
                    <Image className="lottery-main-img3" src={item.pic}></Image>
                  ))}
                </View>
              </Then>
            </If>
            <If condition={this.imgLength <= 1}>
              <Then>
                <View className="lottery-main-box">
                  {lotteryDialogInfo.map((item) => (
                    <Image className="lottery-main-img1" src={item.pic}></Image>
                  ))}
                </View>
              </Then>
            </If>
          </View>
          <View className="lottery-btn" onClick={hideLotteryDialog}>
            收入赏袋
          </View>
          <View className="lottery-tips">在赏袋可查看中赏详情</View>
        </View>
      </Overlay>
    );
  }
}
