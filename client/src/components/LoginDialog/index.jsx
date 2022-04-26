import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Dialog from '../Dialog/index';
import { Button } from '@tarojs/components';
import './index.less';

@inject('store')
@observer
export default class LoginDialog extends Component {
  render() {
    const { isShowAuthDialog, closeDialog, bindGetUserInfo } = this.props.store.userInfo;
    return (
      <Dialog show={isShowAuthDialog} onClose={closeDialog} title={'登录'} content={'欢迎来到日贩一番赏! 请先登录账户'}>
        <Button className="login-btn" onClick={bindGetUserInfo}>
          去登录
        </Button>
      </Dialog>
    );
  }
}
