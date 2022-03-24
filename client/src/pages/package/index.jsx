import { Component } from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.less'

@inject('store')
@observer
export default class Package extends Component {
  render() {
    return (
      <>
        <View>pkg</View>
      </>
    )
  }
}
