import { Component } from 'react';
import { View, Text } from '@tarojs/components';
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
    const { skuList } = this.props.store.main;
    return (
      <View className="index">
        {skuList.map((item) => {
          return (
            <View key={item._id} onClick={() => this.handelClick(item._id)}>
              <View className="item">
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
              <View>
                <Text>
                  盒子：{item.price}/{item.originPrice}
                </Text>
              </View>
              <View>
                <Text>
                  box: {item.left} / {item.total}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default Index;
