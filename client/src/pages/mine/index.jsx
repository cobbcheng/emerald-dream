import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.less'

@inject('store')
@observer
export default class Sku extends Component {
  render() {
    return (
      <>
        <View>user info</View>
        <View>wallet</View>
        <View>button list</View>
      </>
    )
  }
}
