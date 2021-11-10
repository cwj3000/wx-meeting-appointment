// index.js
const app = getApp();
const mRequest = require('../../api/index')

Page({
	data: {
		showItem: true, // 是否显示列表数据
		searchList: [], // 查询列表
		meetingList: [], // 全部数据列表
		keyword: '', // 查询关键词
		id: '', //会议室id
		status: '', // 0：会议未开始, 1：会议正在进行, 2：会议已结束
		optionIndex: [0, 1], // 下拉选项索引
		option: ['会议室'], // 选项
	},

	// 加载数据
	onLoad(options) {
		const that = this
		that.setData({
			keyword: options.keyword
		});
		this.toSearch();
	},

	// 搜索/查询会议室
	toSearch(e) {
		const that = this;
		mRequest.getMeetingRoomIds(that.data.keyword).then(res => {
			if (res.data.items.length == 0) {
				wx.showToast({
					title: '暂无数据~',
					icon: 'loading',
					duration: 2000
				})
			} else {
				console.log(res);
				that.setData({
					searchList: res.data.items
				})
				wx.showToast({
					title: '查询成功',
					duration: 2000
				})
			}
		}).catch(err => {
			console.log('error:', err);
			that.setData({
				showItem: false
			})
		})
	},

	// 删除会议室
	deleteMeeting: function (e) {
		let that = this;
		var _id = e.currentTarget.dataset.id;
		wx.showModal({
			title: '提示',
			content: '确定要删除[' + e.currentTarget.dataset.name + ']吗？',
			icon: '',
			success: function (sm) {
				if (sm.cancel) {
					console.log("点击了取消！");
				} else {
					mRequest.deleteMeetingRooms(_id).then(res => {
						console.log("删除结果：" + JSON.stringify(res));
						if (res.code == '0') {
							that.data.meetingList.splice(e.target.dataset.index, 1);
							wx.showToast({
								title: "删除成功！" + res.msg,
								duration: 2000
							});
							setTimeout(function () {
								wx.navigateTo({
									url: '../index/index',
								})
							}, 2000);
						} else {
							wx.showToast({
								title: '删除失败！',
								icon: 'error',
								duration: 2000
							})
						}
					}).catch(err => {
						console.log(err);
					})
				}
			}
		})
	},
	
	// 会议排序
	toUp: function (e) {
		let i = utils.$attr(e, 'i')
		let temp = this.data.meetingList[i]
		this.data.meetingList[i] = this.data.meetingList[i - 1]
		this.data.meetingList[i - 1] = temp
		this.setData({
			meetingList: this.data.meetingList
		})
	},
	toDown: function (e) {
		let i = utils.$attr(e, 'i')
		let temp = this.data.meetingList[i]
		this.data.meetingList[i] = this.data.meetingList[i + 1]
		this.data.meetingList[i + 1] = temp
		this.setData({
			meetingList: this.data.meetingList
		})
	},

	// 返回顶部
	toTop: function (e) {
		if (wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0
			})
		}
	},

	//下拉刷新
	onPullDownRefresh: function () {
		wx.showLoading({
			title: '加载中',
		});
		this.getMeetingList()
		setTimeout(function () {
			wx.hideLoading()
		}, 1000);
		wx.stopPullDownRefresh();
	},

	// 触发并传参到修改页面
	goEdit: function (e) {
		let id = e.currentTarget.dataset.id;
		let time = e.currentTarget.dataset.time;
		let name = e.currentTarget.dataset.name;
		let beginTime = e.currentTarget.dataset.begintime;
		let endTime = e.currentTarget.dataset.endtime;
		let max = e.currentTarget.dataset.max;
		wx.navigateTo({
			url: '/pages/edit/edit?id=' + id + '&time=' + time + '&name=' + name + '&beginTime=' + beginTime + '&endTime=' + endTime + '&max=' + max
		})
	},

	bindSearchInput: function (e) {
		this.setData({
			keyword: e.detail.value
		})
	},

})