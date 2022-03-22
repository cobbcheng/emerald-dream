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
        <View>banner</View>
        <View>第1、13箱 赏品剩余 7/80</View>
        <View>list</View>
        <View>
          <Text>冲1发</Text>
          <Text>冲3发</Text>
          <Text>冲5发</Text>
          <View>换</View>
          <View>全冲</View>
        </View>
      </>
    )
  }
}
