import Taro from '@tarojs/api'
import { navigateBack as navigateBackH5, navigateTo as navigateToH5 } from '@tarojs/taro-h5'

import native from '../NativeApi'

function getFromParameter (from: string|undefined): number {
  let number: number = -1
  if (from) {
    // 尝试从from参数中提取数字
    const numberMatch = from.match(/native_(\d+)/)
    number = numberMatch ? parseInt(numberMatch[1], 10) : 1
  }
  return number
}

const delay = 300
let lastExecuteTime = 0
let lastUrl

/**
 * 保留当前页面，跳转到应用内的某个页面。
 * 重复点击时 navigateTo 会重复跳转，因此进行限制。
 *
 * @canUse navigateTo
 * @__object [url, events]
 */
export function navigateTo (option: Taro.navigateTo.Option) {
  const targetUrl = option.url
  const executeTime = new Date().getTime()
  if (executeTime - lastExecuteTime < delay && lastUrl === targetUrl) {
    return Promise.resolve({ errMsg: 'navigateTo调用频率太高' })
  }
  lastExecuteTime = executeTime
  lastUrl = targetUrl
  return navigateToH5(option)
}

/**
 * 退出当前小程序。必须有点击行为才能调用成功。
 *
 * @canUse exitMiniProgram
 * @__object [url, events]
 */
export function exitMiniProgram (option?: any) {
  native.exitMiniProgram(option)
}

/**
 * 关闭当前页面，返回上一页面或多级页面。
 *
 * @canUse navigateBack
 * @__object [delta]
 */
export function navigateBack (options: Taro.navigateBack.Option) {
  // 获取当前页面的实例
  const instance = Taro.getCurrentInstance()
  // 获取当前页面的完整URL
  const from = instance?.router?.params?.from
  const delta = getFromParameter(from)
  if (delta > 0) {
    // web回退到原生
    native.nativeBack()
    return new Promise(resolve => setTimeout(resolve, 200))
      .then(() => {
        // 先让native执行完返回动画，再执行Taro侧的返回
        return navigateBackH5({ delta: delta })
      })
  }
  return navigateBackH5(options)
}

// ----- 容器共用及混合路由 ------

// 监听原生路由操作（跳转及返回），Taro侧的路由同步执行操作
native.onNativeNavigate({
  nativeNavigateTo: (url: string) => {
    // 打开新的原生页面，但Web容器是共用的，新页面的加载，需要通过Taro侧来实现，不能通过webController.loadUrl()实现，会影响Taro的路由逻辑
    navigateToH5({
      url: url,
      success: function () {}
    })
  },
  nativeNavigateBack: (delta: number) => {
    // 原生返回时，Taro侧也需要同步返回
    navigateBackH5({
      delta: delta
    })
  }
})

