import { Component } from 'react';
import { WebView } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';

export default class AppWebView extends Component {
  $instance = getCurrentInstance();
  get url() {
    return this.$instance.router.params.url;
  }
  render() {
    return <WebView src={this.url}></WebView>;
  }
}
