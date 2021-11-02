// logs.js
const util = require('../../utils/util.js')

// Page({
//   data: {
//     logs: []
//   },
//   onLoad() {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(log => {
//         return {
//           date: util.formatTime(new Date(log)),
//           timeStamp: log
//         }
//       })
//     })
//   }
// })

Page({
  data: {
    inputPassword: false,
    isLoading: false,
    account: '',
    password: ''
  },
	
  onLoad: function () {
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
	
		 //事件处理函数: 登录成功跳转 --> 首页会议列表
		 toLogin:function() {
			wx.navigateTo({
				url:'../index/index'
			})
		},
		
/* 			// 登录处理
				toLogin: function () {
				var that = this;
				if (this.data.username.length == 0 || this.data.password.length == 0) {
					wx.showToast({
						title: '账号或密码不能为空',
						icon: 'none',
						duration: 2000
					})
				} else {
					wx.request({
						url: '',
						method: 'post',
						data: {
							username: that.data.username,
							password: that.data.password
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' // 默认值
						},
						success(res) {
							if (res.data.code == "OK") {
								var unitName = res.data.data.User.unitName;
								var unitId = res.data.data.User.unitId;
								wx.setStorageSync('unitId', unitId);
								wx.setStorageSync('unitName', unitName);
								// wx.switchTab({
								//   url: '../overviewData/realTimeData'
								// })
								wx.navigateTo({
									url:'../index/index'
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
			}, */
		
	
})

