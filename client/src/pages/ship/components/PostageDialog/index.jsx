import Dialog from '@/components/Dialog';
import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View } from '@tarojs/components';
@inject('store')
@observer
export default class PostageDialog extends Component {
  pay = () => {
    const { payPostage, hidePostageDialog } = this.props.store.pkg;
    payPostage({
      callback: hidePostageDialog,
    });
  };
  render() {
    const { postageDialogVisible, hidePostageDialog } = this.props.store.pkg;
    return (
      <Dialog
        title={'发货数量不足'}
        show={postageDialogVisible}
        onClose={hidePostageDialog}
        content={'由于成本原因，发货数量少于5个，需要支付18元邮费，敬请谅解'}
      >
        <View onClick={this.pay}>立即支付</View>
      </Dialog>
    );
  }
}
