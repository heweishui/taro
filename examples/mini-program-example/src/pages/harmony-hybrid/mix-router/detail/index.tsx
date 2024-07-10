import React from 'react'
import { View, Button, Text } from '@tarojs/components'
import './index.scss'
import Taro from "@tarojs/taro";
export default class Index extends React.Component {
  state = {
    // syncSingleResult: '',
    // requestSingleResult: '',
    // requestConcurrentResult: '',
    // requestHignConcurrentResult: '',
    // syncResult: '',
    // requestByJsResult: ''
  }

  render() {
    // const { syncSingleResult } = this.state
    return (
      <View className='container'>
        <Text className='title'>
          混合路由测试场景：小程序详情页
        </Text>
        <Button
            onClick={()=>{
              Taro.navigateBack()
            }}>
          小程序端：返回
        </Button>
      </View>
    )
  }
}
