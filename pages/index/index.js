// index.js
const app = getApp();
const mRequest = require('../../api/index')
const utils = require('../../utils/util')

Page({
	data: {
		// baseURL: 'http://meeting.api.jhelida.com',
		scrollTop: 0,
		showItem: true,  // 是否显示列表数据
		searchList: [],  // 查询列表
		meetingList: [], // 全部数据列表
		keyword: '',     // 查询关键词
		id: '',          //会议室id
		status: '',      // 0：会议未开始, 1：会议正在进行, 2：会议已结束
		optionIndex: [0,1], // 下拉选项索引
		option: ['会议室'],  // 选项
	},

	// 加载会议列表数据
	onLoad() {
		this.getMeetingList();
	},

	// 获取会议数据
	getMeetingList:function() {
		const that = this
		mRequest.getMeetingRoomsList().then(res => {
			if (res) {
				let listData = res.data;
				if (listData == null) {
					wx.toastText({
						title: '获取数据失败' + res.data.msg,
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

	// 会议排序
	toUp: function (e) {
		let i = utils.$attr(e, 'i')
		let temp = this.data.meetingList[i]
		this.data.meetingList[i] = this.data.meetingList[i-1]
		this.data.meetingList[i-1] = temp
		this.setData({
			meetingList: this.data.meetingList
		})
	},
  toDown:function(e) {
    let i =utils.$attr(e,'i')
    let temp = this.data.meetingList[i]
    this.data.meetingList[i] = this.data.meetingList[i+1]
    this.data.meetingList[i+1] = temp
    this.setData({
      meetingList:this.data.meetingList
    })
	},
	
	// 返回顶部
	toTop:function(e) {
		if(wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0
			})
		}
	},
	
  //下拉刷新
  onPullDownRefresh:function() {
    wx.showLoading({
      title: '加载中',
		});
		this.getMeetingList()
		setTimeout(function(){
			wx.hideLoading()
		},1000);
    wx.stopPullDownRefresh(); 
  },

	// 搜索/查询会议室
	toSearch(e) {
		let keyword = e.currentTarget.dataset.keyword;
		wx.navigateTo({
			url: `/pages/search/search?keyword=${keyword}`,
		})
	},
	/* 	toSearch(e) {
			const that = this;
			console.log(that.data.keyword);
			mRequest.getMeetingRoomIds(that.data.keyword).then(res => {
				if (res.data.items.length == 0) {
					wx.showToast({
						title: '暂无数据~',
						icon: 'loading',
						duration: 2000
					})
				} else {
					console.log(res);
					let searchList = res.data.items;
					that.setData({
						meetingList: searchList
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
	 */
	
	 // 编辑
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

	// 新增
	createMeeting() {
		wx.navigateTo({
			url: '../create/create'
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
								// title: "删除成功！" + res.msg,
								title: "删除成功！",
								duration: 2000
							});
							that.setData({
								meetingList: that.data.meetingList
							});
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

	bindSearchInput: function (e) {
		this.setData({
			keyword: e.detail.value
		})
	},

})