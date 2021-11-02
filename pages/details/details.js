// details.js
const util = require('../../utils/util.js')

Page({
  data: {

  },

  onShow: function () {
    let that = this;
    // 从缓存中获取
    wx.getStorage({
      key: 'details',
      success: function (res) {
        that.setData({
          getTitle: res.data.getTitle,
          getId:res.data.getId,
          getBeginTime: res.data.getBeginTime,
          getSpeaker: res.data.getSpeaker,
          getAppointmenter: res.data.getAppointmenter
        })
      },
    })
  },

  onLoad() {

  }
})
