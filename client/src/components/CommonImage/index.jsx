import { Image } from '@tarojs/components';
import { Component } from 'react';
import { Overlay } from '@antmjs/vantui';
import './index.less';

export default class CommonImage extends Component {
  state = {
    showDetail: false,
  };
  showDetail = () => {
    this.setState({ showDetail: true });
  };
  hideDetail = () => {
    this.setState({ showDetail: false });
  };
  render() {
    return (
      <>
        <Image src={this.props.src} className={this.props.className} onClick={this.showDetail}></Image>
        <Overlay show={this.state.showDetail} onClick={this.hideDetail}>
          <Image src={this.props.src} className="img-detail" />
        </Overlay>
      </>
    );
  }
}
