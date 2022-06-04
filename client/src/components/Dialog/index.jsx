import { Component } from 'react';
import { Popup } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import './index.less';

export default class Dialog extends Component {
  render() {
    const { show, onClose } = this.props;
    return (
      <Popup show={show} onClose={onClose} style="background-color: transparent;">
        <View className="dialog">
          <View className="dialog-header">
            <View className="dialog-title">{this.props.title}</View>
            <View className="dialog-close" onClick={onClose}></View>
          </View>
          <View className="dialog-content">{this.props.content}</View>
          <View className="dialog-button">{this.props.children}</View>
        </View>
      </Popup>
    );
  }
}
