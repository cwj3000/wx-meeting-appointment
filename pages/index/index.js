// index.js
const app = getApp();
const mRequest = require('../../api/index')

Page({
	data: {
		option: [],
		showItem: true,
		searchList: [],  // 查询列表
		meetingList: [],  // 全部数据列表
		keyword: '' ,     // 查询关键词
		roomId:undefined
	},

	// 加载会议列表数据
	onLoad() {
		const that = this
		mRequest.getMeetingRoomsList().then(res => {
			if (res) {
				console.log(res);
				let list = res.data.items;
				let listData = res.data;
				if(listData == null) {
					let toastText = '获取数据失败' + res.data.msg;
					wx.toastText({
						title: toastText,
						icon: '',
						duration: 2000
					});
				} else {
					that.setData({
						showItem: true,
						meetingList: res.data.items
					})
				}
			}
		}).catch(err => {
			console.log('error: ', err);
			that.setData({
				showItem: false
			})
		})
	},

	// 搜索会议 or 会议室
	toSearch(e) {
		console.log('正在搜索ing');
		const that = this;
		console.log(that.data.keyword);
		mRequest.getMeetingRoomIds(that.data.keyword).then(res => {
			if (res) {
				console.log(res);
				let searchList = res.data.items;
				that.setData({
					// showItem: true,
					meetingList: searchList
				})
			}
		}).catch(err => {
			console.log('error:' ,err);
			that.setData({
				showItem: false
			})
		})
	},

	// 触发并传参到修改页面
	goEdit:function(e) {
		let id = e.currentTarget.dataset.id;
		let time = e.currentTarget.dataset.time;
		let name = e.currentTarget.dataset.name;
		let beginTime = e.currentTarget.dataset.begintime;
		let endTime = e.currentTarget.dataset.endtime;
		let max = e.currentTarget.dataset.max;
/* 		console.log("发送端:" + id);
		console.log("发送端:" + name);
		console.log("发送端: " + beginTime);
		console.log("发送端:" + endTime);
		console.log("发送端: " + max);
		console.log("发送端: " + time); */
		wx.navigateTo({
      url: '/pages/edit/edit?id='+id+'&time='+time+'&name='+name+'&beginTime='+beginTime+'&endTime='+endTime+'&max='+max
    })
	},

	// 跳转到新增页面
	createMeeting() {
		wx.navigateTo({
			url: '../create/create'
		})
	},

	  // 删除会议室
		deleteMeeting: function(e) {
			let that = this;
			var _id = { id:e.currentTarget.dataset.id };
			wx.showModal({
				title: '提示',
				content: '确定要删除[' + e.currentTarget.dataset.name + ']吗？',
				icon: '',
				success: function(sm) {
					if(sm.cancel) {
						console.log("点击了取消！");
					} else {
						mRequest.deleteMeetingRooms(_id).then(res => {
							console.log("删除结果：" + JSON.stringify(res));
							let code = res.code;
							if(code != 0) {
								wx.showToast({
									title: '删除失败！',
									icon: '',
									duration: 2000
								})
							} else {
								that.data.meetingList.splice(e.target.dataset.index, 1);
								wx.showToast({
									title: "删除成功！" + res.msg,
									icon: '',
									content: res.msg,
									duration: 2000
								});
								that.setData({  
									meetingList: that.data.meetingList
								});
							}
						}).catch(err => {
							console.log(err);
						})
					}
				}
			})
		},
	
 
/* 	deleteMeeting: function(e) {
		var params = {
			id: e.target.dataset.id
		}
		var that = this;
		wx.showModal({
			title: '提示',
			content: '确定要删除[' + e.target.dataset.name + ']吗？',
			success: function(res) {
				if(res.cancel) {
					console.log('点击了取消');
				} else {
					wx.request({
						url: 'https://meeting.api.jhelida.com/manager/meetingRooms',
						data: JSON.stringify(params),
						method: 'DELETE',
						success: function(res) {
							var code = res.data.code;
							console.log('删除结果：' + res.data.msg);
							if(code != 0) {
								wx.showToast({
									title: '删除失败！',
									icon: '',
									duration: 2000
								})
							} else {
								that.data.meetingList.splice(e.target.dataset.index, 1);
								wx.showToast({
									title: "删除成功！" + res.data.msg,
									icon: '',
									duration: 2000
								});
								that.setData({  
									meetingList: that.data.meetingList
								});
							}
						}
					})
				}
			},
			fail: function(){}
		})
	}, 
 */


	bindSearchInput:function(e) {
		this.setData({
			keyword: e.detail.value
		})
	},

})