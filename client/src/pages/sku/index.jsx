import { Component } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { getCurrentInstance } from '@tarojs/taro';
import './index.less';

@inject('store')
@observer
export default class Sku extends Component {
  $instance = getCurrentInstance();

  componentDidMount() {
    const { id } = this.$instance.router.params;
    const { getBoxList } = this.props.store.sku;
    getBoxList(id);
  }

  getPrize(boxId) {
    const { getPrizeList } = this.props.store.sku;
    getPrizeList(boxId);
  }

  render() {
    const { list } = this.props.store.sku;
    return (
      <>
        <View>
          {list.map(item => <Button onClick={() => this.getPrize(item._id)} key={item._id}>第「{item.sortId}」箱</Button>)}
        </View>
      </>
    );
  }
}
