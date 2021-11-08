// edit.js
const util = require('../../utils/util.js')
const mRequest = require('../../api/index')

Page({
	data: {
		name: '',
		id: '',
		beginTime: '',
		endTime: '',
		admin: '',
		max: '',
	},

	onLoad: function (options) {
		// 从列表页item传过来的值
		/*  		console.log('接收端:' + options.id);
				console.log('接收端：' + options.name);
				console.log('接收端：' + options.max);
				console.log('接收端：' + options.beginTime);
				console.log('接收端：' + options.endTime);  */
		let that = this;
		if (options.id == undefined) {
			return;
		}
		this.setData({
			id: options.id,
			name: options.name,
			beginTime: options.beginTime,
			endTime: options.endTime,
			admin: options.admin,
			max: options.max,
			keyword: options.name
		})
		mRequest.getMeetingRoomIds({
			id: options.id
		}).then(res => {
			if (res.code = 0) {
				console.log("res:" + res);
				let item = res.data.items;
				if (item == null) {
					wx.toastText({
						title: '获取数据失败' + res.msg,
						icon: '',
						duration: 2000
					});
				} else {
					that.setData({
						name: item.name,
						time: item.time,
						beginTime: item.beginTime,
						endTime: item.endTime,
						max: item.max,
						id: item.id,
						admin: item.admin
					})
				}
			}
		}).catch(err => {
			console.log('error: ', err);
		})
	},

	// 修改
	formSubmit: function (e) {
		let that = this;
		/* 			let formData = {
						id: that.data.id,
						name: e.detail.value,
						beginTime: e.detail.value,
						endTime:e.detail.value,
						admin: e.detail.value,
						max: e.detail.value
					}; */
		let formData = e.detail.value;
		console.log('formData:' + JSON.stringify(formData));
		if (that.data.id != undefined) {
			formData.id = that.data.id;
		}
		mRequest.updateMeetingRooms(formData).then(res => {
			console.log("修改结果：" + JSON.stringify(res));
			if (res.code != '0') {
				wx.showToast({
					title: '修改失败！',
					icon: '',
					duration: 2000
				})
			} else {
				wx.showToast({
					title: '修改成功！' || res.msg,
					icon: '',
					duration: 3000
				})
				setTimeout(function(){
					wx.navigateTo({
						url: '../index/index',
					})
				},3000)
			}
			if (that.data.id == undefined) {
				wx.redirectTo({
					url: '../index/index',
				})
			}
		}).catch(err => {
			console.log(err)
		})
	},

	updataMeeting: function (e) { },

	// 重置表单
	reset: function () {
		this.setData({
			name: '',
			beginTime: '',
			endTime: '',
			time: '',
			max: '',
			admin: ''
		})
	},

	//验证函数
	initValidate() {
		const rules = {
			name: {
				required: true,
				minlength: 2
			},
		}
		const messages = {
			name: {
				required: '请填写会议名称',
				minlength: '请输入正确的名称'
			}
		}
	},

	// 监听表单输入
	bindTimeChange: function (e) {
		this.setData({
			time: e.detail.value
		})
	},
	beginTimeChange: function (e) {
		this.setData({
			beginTime: e.detail.value
		})
	},
	endTimeChange: function (e) {
		this.setData({
			endTime: e.detail.value
		})
	},
	getNameInput: function (e) {
		this.setData({
			name: e.detail.value
		})
	},
	getTimeInput: function (e) {
		this.setData({
			time: e.detail.value
		})
	},
	getAdminInput: function (e) {
		this.setData({
			admin: e.detail.value
		})
	},
	getMaxInput: function (e) {
		this.setData({
			max: e.detail.value
		})
	},


})