import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import CommonCheckbox from '@/components/CommonCheckbox';
import { If } from 'react-if';
import './index.less';

@inject('store')
@observer
export default class BoxSelect extends Component {
  state = {
    checked: false,
  };

  id = getCurrentInstance().router.params.id;

  componentDidMount() {
    this.props.store.selectBox.getBoxList(this.id);
  }

  checkChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  select = (item) => {
    if (item.all <= 0) {
      return;
    }
    wx.navigateTo({
      url: `/pages/sku/index?id=${this.id}&boxId=${item.id}`,
    });
  };

  get filterList() {
    const { list } = this.props.store.selectBox;
    if (this.state.checked) {
      return list.filter((item) => item.all > 0);
    }
    return list;
  }

  render() {
    return (
      <View className="box-select">
        <View className="check" onClick={this.checkChange}>
          <CommonCheckbox checked={this.state.checked} onChange={this.checkChange}></CommonCheckbox>
          <View>不看售罄</View>
        </View>
        <View className="sort">
          <View className="sort-item">
            余量 <View className="sort-icon"></View>
          </View>
          <View className="sort-item">
            箱号 <View className="sort-icon"></View>
          </View>
        </View>
        <View className="list">
          {this.filterList.map((item) => {
            return (
              <View className="box" onClick={() => this.select(item)}>
                <View className="box-left">
                  <View className="box-icon"></View>
                  <View className="box-stat">剩余{item.all}张</View>
                </View>
                <View className="box-right">
                  {item.items.map((l) => {
                    return (
                      <View className="box-item">
                        {l.level} {l.left}/{l.top}
                      </View>
                    );
                  })}
                </View>
                <If condition={item.all === 0}>
                  <View className="sold-out">
                    <View className="sold-out-icon"></View>
                  </View>
                </If>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
