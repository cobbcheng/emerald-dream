import { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject('store')
@observer
class Common extends Component {
  componentDidMount() {
    const { userInfo } = this.props.store;
    userInfo.getOpenId();
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default Common;
