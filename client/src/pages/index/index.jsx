import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Index extends Component {
  componentWillMount () { }

  componentDidMount () {
    this.props.store.main.loadList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { skuList } = this.props.store.main
    return (
      <View className='index'>
        {
          skuList.map(item => {
            return (
              <View className='item' key={item.id}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default Index
