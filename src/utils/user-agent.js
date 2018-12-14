/**
 * 用户类型
 * @since 1.0.0
 * @version 1.0.0
 */

const agentRegExp = {
  mobile: /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i,
  alipay: /alipayclient|aliapp/i,
  wechat: /micromessenger/i,
  ios: /iphone|ipad|ipod/i,
  android: /android/i
  // ie: !!/trident|edge/i.test(ua),
  // chrome: !!/chrome/i.test(ua),
  // safari: !!/safari/i.test(ua),
  // firefox: !!/firefox/i.test(ua),
  // opera: !!/opera/i.test(ua),
}
const osVersionRegExp = {
  iphone: /iphone os (\d+)_(\d+)/i,
  ipad: /cpu os (\d+)_(\d+)/i,
  android: /android (\d+).(\d+)/i
}
const platformVersionRegExp = {
  wechat: /micromessenger\/(\d+).?(\d+)/i,
  alipay: /alipayclient\/(\d+).?(\d+)/i
}
/**
 * 用户代理类
 * @class
 */
export class UserAgent {
  ua = null // 用户代理字符串
  osVersion = null // 系统版本号
  osMainVersion = null // 系统主版本
  osSubVersion = null // 系统次版本
  platformVersion = null // 平台版本号
  platformMainVersion = null // 平台主版本
  platformSubVersion = null // 平台次版本

  /**
   * 构造函数
   * @constructor
   * @param {string} ua 用户代理字符串
   *
   */
  constructor(ua = navigator.userAgent.toLowerCase()) {
    this.ua = ua

    // 获取系统版本
    Object.keys(osVersionRegExp).map(key => {
      return osVersionRegExp[key]
    }).every((regexp) => {
      let res = regexp.exec(this.ua)
      if (res !== null) {
        this.osMainVersion = Number.parseInt(res[1], 10) // 系统主版本
        this.osSubVersion = Number.parseInt((res[2] || 0), 10) // 系统次版本
        this.osVersion = Number.parseFloat(`${this.osMainVersion}.${this.osSubVersion}`) // 系统版本号
        return false
      }
      return true
    })

    // 获取平台版本
    Object.keys(platformVersionRegExp).map(key => {
      return platformVersionRegExp[key]
    }).every((regexp) => {
      let res = regexp.exec(this.ua)
      if (res !== null) {
        this.platformMainVersion = Number.parseInt(res[1], 10) // 平台主版本
        this.platformSubVersion = Number.parseInt((res[2] || 0), 10) // 平台次版本
        this.platformVersion = Number.parseFloat(`${this.platformMainVersion}.${this.platformSubVersion}`) // 平台版本号
        return false
      }
      return true
    })
  }

  /**
   * 判断当前的用户代理
   * @param {string} name - 期望用户代理名称
   * @returns {boolean} 是否为期望用户代理
   */
  is(name) {
    if (!agentRegExp[name]) {
      return false
    }

    return !!agentRegExp[name].test(this.ua)
  }
}

export default new UserAgent()
