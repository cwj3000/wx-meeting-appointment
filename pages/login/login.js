// logs.js
const util = require('../../utils/util.js')

const app = getApp();

Page({
  data: {
    inputPassword: false,
    isLoading: false,
    account: '',
    password: '',
    username: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

        // 登录处理
        login: function () {
          var that = this;
          if (this.data.username.length == 0 || this.data.password.length == 0) {
            wx.showToast({
              title: '账号或密码不能为空',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.request({
              url: '/login', 
              method: 'post',
              data: {
                username: that.data.username,
                password: that.data.password
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' 
              },
              success(res) {
                if (res.data.code == "OK") {
                  var unitName = res.data.data.User.unitName;
                  var unitId = res.data.data.User.unitId;
                  wx.setStorageSync('unitId', unitId);
                  wx.setStorageSync('unitName', unitName);
                  wx.switchTab({
                    url: '../overviewData/realTimeData'
                  })
                } else {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }
        },
	
  onLoad: function () {
		if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
	
  pwdFocus() {
    this.setData({
      inputPassword: true
    })
  },
	
  pwdBlur() {
    this.setData({
      inputPassword: false
    })
  },
	
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
	
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
	
  bindIdentity() {
    this.setData({
      isLoading: true
    })
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)
	},
	
		 toLogin:function() {
			wx.navigateTo({
				url:'../index/index'
			})
		},
		
		getUserInfo: function(e) {
			console.log(e)
			app.globalData.userInfo = e.detail.userInfo
			this.setData({
				userInfo: e.detail.userInfo,
				hasUserInfo: true
			})
    },
    


	
})

