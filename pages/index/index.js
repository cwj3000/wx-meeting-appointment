// index.js

const mRequest = require('../../api/index')

Page({
	data: {
		option: [{
				text: '会议室',
				value: 0
			},
			{
				text: '会议',
				value: 1
			}
    ],
    showItem: true,
		meetingList:[
			{id:"1",meetingRoom: "会议室测试001",time: "2021-10-26 14:00~1021-10-26 16:00",unit:"开发小组",host:"前端",speaker:"小李",appointmenter:"小王",createBy:"测试单位",description:"这是一个测试会议！！"},
			{id:"2",meetingRoom: "会议室测试002",time: "2021-10-26 14:00~1021-10-26 16:00",unit:"开发小组",host:"前端",speaker:"小李",appointmenter:"小王",createBy:"测试单位",description:"这是一个测试会议！！"},
			{id:"3",meetingRoom: "会议室测试003",time: "2021-10-26 14:00~1021-10-26 16:00",unit:"开发小组",host:"前端",speaker:"小李",appointmenter:"小王",createBy:"测试单位",description:"这是一个测试会议！！"}
		]
  },
  
  // 加载会议列表
  onLoad() {
  /*   const that = this
		mRequest.getMeetingList.then(res => {
      // const {name,id} = res.data;
      this.meetingList = res.data;
			that.setData({
				showItem: true,
				item: item.list.slice(0, 3),
				list2: nam.list[0].list,
				tuokocontent: hotRecommends.list[4].list
			})
		}).catch(err => {
			console.log('error: ', err);
			that.setData({
				showItem: false
			})
		}) */
  },

  // 搜索会议or会议室
  toSearch(){
    console.log('正在搜索ing')
  },

  // item事件处理
  goDetails(e){
    let getId = e.currentTarget.dataset.id || '';
    let getBeginTime = e.currentTarget.dataset.beginTime || '';
    let getHost = e.currentTarget.dataset.host || '';
    let getSpeaker = e.currentTarget.dataset.speaker || '';
    let getAppointmenter = e.currentTarget.dataset.appointmenter || '';
    let getTitle = e.currentTarget.dataset.title || '';
    wx.setStorage({
      key: 'details',
      data: {
        getId,
        getBeginTime,
        getHost,
        getSpeaker,
        getAppointmenter,
        getTitle
      },
      success: function(){
        wx.navigateTo({
          url: '../details/details?getId=' + getId + "&getBeginTime" + getBeginTime + "&getHost" + getHost + "&getSpeaker"
        + getSpeaker + "&getAppointmenter" + getAppointmenter + "&getTitle" + getTitle
      })
      }
    })
  },

	bindReplaceInput: function(e) {
		var value = e.detail.value
		var pos = e.detail.cursor
		var left
		if (pos !== -1) {
			// 光标在中间
			left = e.detail.value.slice(0, pos)
			// 计算光标的位置
			pos = left.replace(/11/g, '2').length
		}
	},

	// 添加会议
	createMeeting() {
		wx.navigateTo({
			url: '../create/create'
		})
  },
  
  // 删除会议列表
  deleteMeeting(e) {
		let that = this;
		wx.showToast({
			title: '提示',
			content: '确定要删除[' + e.target.dataset.name + ']吗？',
			icon: '',
			success: function(sm) {
				if(sm.comfirm) {
					wx.request({
						url: '',
						data: {
							id: e.target.dataset.nameid
						},
						method: '	GET',
						success: function(res) {
							let result = res.statusCode;
							var toastText = "删除成功";
							if(result !=200) {
								toastText = "删除失败";
							} else {
								that.data.meetingList.splice(e.target.dataset.index,1);
								that.setData({
								  meetingList:that.data.meetingList
								});
							}
							wx.showToast({
								title: toastText,
								icon: '',
								duration: 2000
							});
						}
					})
				}
			}

		})
	},


})
