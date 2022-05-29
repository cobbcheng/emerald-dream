import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { Overlay } from '@antmjs/vantui';
import './index.less';

@inject('store')
@observer
export default class PrizeRecord extends Component {
  componentDidMount() {
    this.props.store.sku.getRecordList();
  }

  render() {
    const { toggleRecordVisible, recordVisible, recordList } = this.props.store.sku;

    return (
      <Overlay show={recordVisible}>
        <View className="record">
          <View className="close" onClick={() => toggleRecordVisible(false)}></View>
          <View className="record-head"></View>
          <View className="record-body">
            {recordList.map((record) => {
              return (
                <View className="record-item">
                  <View className="record-avatar">
                    <Image src={record.avatarUrl}></Image>
                  </View>
                  <View className="record-title">
                    <View className="record-user">{record.nickName}</View>
                    <View className="record-time">{record._createTime}</View>
                  </View>
                  <View className="record-level">{record.level}赏</View>
                </View>
              );
            })}
          </View>
        </View>
      </Overlay>
    );
  }
}
