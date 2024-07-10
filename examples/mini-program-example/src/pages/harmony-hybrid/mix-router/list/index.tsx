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
      <View className='harmony-hybrid-page'>
        <Text className='title'>
          混合路由测试场景：小程序列表页
        </Text>
        <Button
            onClick={()=>{
              Taro.navigateTo({
                url: 'pages/harmony-hybrid/mix-router/detail/index'
              })
            }}>
          跳转：小程序详情页
        </Button>
      </View>
    )
  }
}
