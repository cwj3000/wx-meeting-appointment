// app.js

const http = require('./utils/request.js')
const api = require('./api/index')

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
  // 异常
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/index/index',
    })
  }

})
