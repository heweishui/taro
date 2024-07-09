import React from 'react'
import { View, Button, Text } from '@tarojs/components'
import './index.scss'
import Taro from "@tarojs/taro";
import nativeApi from "@/util/nativeApi";
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
          混合路由测试场景：小程序首页
        </Text>
        <Button
            onClick={()=>{
              Taro.navigateTo({
                url: 'pages/harmony-hybrid/mix-router/list/index'
              })
            }}>
          跳转：小程序列表页
        </Button>
        <Button
            onClick={()=>{
              nativeApi.navigateToNative({
                url: 'pages/NativeList'
              })
            }}>
          跳转：原生列表页
        </Button>
      </View>
    )
  }
}
