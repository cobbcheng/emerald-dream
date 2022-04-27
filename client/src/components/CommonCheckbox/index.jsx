import { Component } from 'react';
import { Checkbox } from '@antmjs/vantui';
import { Image, View } from '@tarojs/components';
import './index.less';

export default class CommonCheckbox extends Component {
  state = {
    activeIcon: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/checkbox_checked.png',
    inactiveIcon: 'https://7969-yifanshang-8g5d7nxddf660e3e-1310253199.tcb.qcloud.la/ui/checkbox_nocheck.png',
  };

  render() {
    return (
      <Checkbox
        value={this.props.checked}
        onChange={this.props.onChange}
        renderIcon={
          <View className="ic flex">
            <Image
              className={this.props.checked ? 'ic' : 'ic-28'}
              src={this.props.checked ? this.state.activeIcon : this.state.inactiveIcon}
            />
          </View>
        }
      ></Checkbox>
    );
  }
}
