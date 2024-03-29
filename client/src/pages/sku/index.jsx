import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import { Popup } from '@antmjs/vantui';
import PricePopup from './components/PricePopup';
import LotteryDialog from './components/LotteryDialog';
import PrizeRecord from './components/PrizeRecord';
import LoginDialog from '../../components/LoginDialog/index';
import CommonImage from '../../components/CommonImage';
import './index.less';
@inject('store')
@observer
export default class Sku extends Component {
  $instance = getCurrentInstance();

  state = {
    showPopup: false,
    checked: false,
    currentBoxId: '',
    currentBoxIndex: 0,
    popupType: 1,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { id, boxId } = this.$instance.router.params;
    const { getSpuDetail, setCurrentBoxId } = this.props.store.sku;
    wx.showLoading();
    getSpuDetail(id)
      .then(() => {
        const firstBox = this.props.store.sku.notEmptyBoxes[0];
        let currentBoxId;
        let currentBoxIndex;

        if (boxId) {
          currentBoxId = boxId;
          currentBoxIndex = this.props.store.sku.notEmptyBoxes.findIndex((item) => item._id === currentBoxId);
        } else {
          currentBoxId = firstBox._id;
          currentBoxIndex = 0;
        }

        this.setState({ currentBoxIndex });
        setCurrentBoxId(currentBoxId);
        return this.getPrize(currentBoxId);
      })
      .then(() => {
        wx.hideLoading();
      });
  };

  nextBox = () => {
    const { notEmptyBoxes, setCurrentBoxId } = this.props.store.sku;
    if (notEmptyBoxes.length === 1) {
      return;
    }
    const { currentBoxIndex } = this.state;
    const nextIndex = currentBoxIndex + 1;
    if (nextIndex >= notEmptyBoxes.length) {
      return;
    }
    const nextBox = notEmptyBoxes[nextIndex];
    this.setState({ currentBoxIndex: nextIndex });
    setCurrentBoxId(nextBox._id);
    this.getPrize(nextBox._id);
  };

  prevBox = () => {
    const { notEmptyBoxes, setCurrentBoxId } = this.props.store.sku;
    if (notEmptyBoxes.length === 1) {
      return;
    }
    const { currentBoxIndex } = this.state;
    const prevIndex = currentBoxIndex - 1;
    if (prevIndex < 0) {
      return;
    }
    const prevBox = notEmptyBoxes[prevIndex];
    this.setState({ currentBoxIndex: prevIndex });
    setCurrentBoxId(prevBox._id);
    this.getPrize(prevBox._id);
  };

  get currentBox() {
    const { currentBoxId } = this.props.store.sku;
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
      // last 不算在内
      result.num = result.num - 1;
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
    return getPrizeList(boxId);
  }

  onClose = () => {
    this.setState({ showPopup: false });
  };

  onShow = (type) => {
    const { userInfo } = this.props.store;
    if (userInfo.isLogin() === false) {
      return;
    }
    this.setState({ showPopup: true, popupType: type });
  };

  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  changeBox = () => {
    const { id } = this.$instance.router.params;
    wx.navigateTo({
      url: `/pages/boxSelect/index?id=${id}`,
    });
  };

  render() {
    const { detail, boxes, prizeList, notEmptyBoxes, toggleRecordVisible, prizeStat } = this.props.store.sku;
    return (
      <View className="sku">
        <View className="header">
          <View className="header-pic">
            <Image src={detail.headPic} className="header-pic-img"></Image>
          </View>
          <View className="btn">
            <View className="btn-record" onClick={() => toggleRecordVisible(true)}></View>
            <View className="btn-price">{detail.originPrice}</View>
          </View>
        </View>
        <View className="line"></View>
        <View className="tab">
          <View className="tab-btn tab-pre" onClick={this.prevBox}></View>
          <View className="tab-info">
            第 <Text className="tab-info-number">{this.state.currentBoxIndex + 1}</Text>/{boxes.length} 箱 &nbsp;
            赏品余量&nbsp;
            <Text className="tab-info-number">{prizeStat.left}</Text>/{prizeStat.total}
          </View>
          <View className="tab-btn tab-next" onClick={this.nextBox}></View>
        </View>
        <View className="list">
          {prizeList.map((item) => (
            <View className="item">
              <View className="item-pic">
                <CommonImage className="item-pic-detail" src={item.pic}></CommonImage>
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
            <View className="bottom-change" onClick={this.changeBox}></View>
            <View className="bottom-all" onClick={() => this.onShow('all')}></View>
          </View>
        </View>
        <Popup
          show={this.state.showPopup}
          position="bottom"
          style="background-color: transparent;"
          onClose={this.onClose}
        >
          <PricePopup onClose={this.onClose} popupState={this.popupState} loadData={this.loadData} />
        </Popup>
        <LoginDialog></LoginDialog>
        <LotteryDialog></LotteryDialog>
        <PrizeRecord></PrizeRecord>
      </View>
    );
  }
}
