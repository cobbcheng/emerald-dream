import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import Taro from '@tarojs/taro';

import './index.less';

@inject('store')
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {
    this.props.store.main.loadList();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handelClick(id) {
    Taro.navigateTo({
      url: '/pages/sku/index?id=' + id,
    });
  }

  render() {
    const { spuList } = this.props.store.main;
    return (
      <>
        <View className="banner"></View>
        <View className="line"></View>
        <View className="index">
          {spuList.map((item) => {
            return (
              <View key={item._id} onClick={() => this.handelClick(item._id)} className="sku">
                <View>
                  <Image src={item.detailPic} className="sku-img" />
                </View>
                <View className="desc">
                  <View className="name">{item.name}</View>
                  <View className="info">
                    <Text>¥{item.originPrice}</Text>
                    <Text>
                      {item.left} / {item.total} 箱
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </>
    );
  }
}

export default Index;
