import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import { Popup, Checkbox } from '@antmjs/vantui';
import PricePopup from './components/PricePopup';
import './index.less';

@inject('store')
@observer
export default class Sku extends Component {
  $instance = getCurrentInstance();

  state = {
    showPopup: false,
    checked: false,
    currentBoxId: '',
    popupType: 1,
  };

  componentDidMount() {
    const { id } = this.$instance.router.params;
    const { getSpuDetail } = this.props.store.sku;
    getSpuDetail(id).then(() => {
      const firstBox = this.props.store.sku.notEmptyBoxes[0];
      this.setState({ currentBoxId: firstBox._id });
      this.getPrize(firstBox._id);
    });
  }

  get currentBox() {
    const { currentBoxId } = this.state;
    const { boxes } = this.props.store.sku;
    return boxes.find((item) => item._id === currentBoxId);
  }

  get popupState() {
    const { prizeList, detail } = this.props.store.sku;
    const { popupType } = this.state;

    if (!this.currentBox) {
      return {};
    }

    const result = {
      price: this.currentBox.price,
      name: detail.name,
      boxId: this.currentBox._id,
    };

    if (typeof popupType === 'number') {
      result.num = popupType;
    } else {
      result.num = prizeList.reduce((acc, cur) => {
        return acc + cur.left;
      }, 0);
    }

    const imgMap = {
      1: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/pic_01.png',
      3: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/pic_03.png',
      5: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/pic_05.png',
      all: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/pic_all.png',
    };

    result.img = imgMap[popupType];

    return result;
  }

  getPrize(boxId) {
    const { getPrizeList } = this.props.store.sku;
    getPrizeList(boxId);
  }

  onClose = () => {
    this.setState({ showPopup: false });
  };

  onShow = (type) => {
    this.setState({ showPopup: true, popupType: type });
  };

  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { detail, boxes, prizeList, notEmptyBoxes } = this.props.store.sku;
    return (
      <View className="sku">
        <View className="header">
          <View className="header-pic">
            <Image src={detail.headPic} className="header-pic-img"></Image>
          </View>
          <View className="btn">
            <View className="btn-record"></View>
            <View className="btn-price">{detail.originPrice}</View>
          </View>
        </View>
        <View className="line"></View>
        <View className="tab">
          <View className="tab-btn tab-pre"></View>
          <View className="tab-info">
            第 <Text className="tab-info-number">{notEmptyBoxes.length}</Text>/{boxes.length} 箱 &nbsp; 赏品余量&nbsp;
            <Text className="tab-info-number">33</Text>/{prizeList.length}
          </View>
          <View className="tab-btn tab-next"></View>
        </View>

        <View className="list">
          {prizeList.map((item) => (
            <View className="item">
              <View className="item-pic">
                <Image className="item-pic-detail" src={item.pic}></Image>
                <View className="item-left">
                  {item.left}/{item.total}
                </View>
              </View>
              <View className="item-info">
                {item.level}赏 {item.name}
              </View>
            </View>
          ))}
        </View>

        <View className="fixed">
          <View className="chong">
            <View className="chong-item chong-1" onClick={() => this.onShow(1)}></View>
            <View className="chong-item chong-3" onClick={() => this.onShow(3)}></View>
            <View className="chong-item chong-5" onClick={() => this.onShow(5)}></View>
          </View>

          <View className="bottom">
            <View className="bottom-change"></View>
            <View className="bottom-all" onClick={() => this.onShow('all')}></View>
          </View>
        </View>

        <Popup
          show={this.state.showPopup}
          position="bottom"
          style="background-color: transparent;"
          onClose={this.onClose}
        >
          <PricePopup onClose={this.onClose} popupState={this.popupState} />
        </Popup>
      </View>
    );
  }
}
