// create.js
const mRequest = require('../../api/index')

Page({
	data: {
		time: '',
		beginTime: '',
		endTime: '',
		name: '',
		admin: '',
		max: ''
	},

	toNext() {
		wx.navigateTo({
			url: '../conferee/conferee'
		})
	},

	onLoad() {
	
	},

		// 新增会议室
		toCreate: function() {
			let that = this;
			let params = {
				name: that.data.name,
				beginTime: that.data.beginTime,
				endTime: that.data.endTime,
				max: that.data.max,
				admin: that.data.admin
			}
			if (this.data.beginTime.length == 0) {
				wx.showToast({
					title: '开始时间不能为空！',
					icon: 'error',
					duration: 2000
				})
			} else {
				mRequest.insertMeetingRooms(params).then(res => {
					console.log(JSON.stringify(params));
						if(res.code == '0') {
							wx.showToast({
								title: '添加成功！',
								duration: 2000
							});
							setTimeout(function(){
								wx.navigateTo({
									url:'../index/index'
								})
							},2000)
						} else {
							wx.showToast({
								title: '添加失败',
								icon: 'loading',
								duration: 2000
							});
						}
				}).catch(err => {
					console.log(err)
				})
			}
		},
	
		// 重置表单
		toReset: function(e) {
			let that = this;
			that.setData({
				name: '',
				endTime: '',
				beginTime: '',
				admin: '',
				max: ''
			})
		},

	//验证函数
	initValidate() {
		const rules = {
			name: {
				required: true,
				minlength: 2
			},
			phone: {
				required: true,
				tel: true
			}
		}
		const messages = {
			name: {
				required: '请填写会议名称',
				minlength: '请输入正确的名称'
			},
			phone: {
				required: '请填写密码',
				tel: '请输入密码'
			}
		}
	},

	bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
	},
	beginTimeChange: function(e) {
		this.setData({
			beginTime: e.detail.value
		})
	},
	endTimeChange: function(e) {
		this.setData({
			endTime: e.detail.value
		})
	},
	getNameInput: function(e) {
		this.setData({
			name: e.detail.value
		})
	},
	getTimeInput: function(e) {
		this.setData({
			time: e.detail.value
		})
	},
	getAdminInput: function(e) {
		this.setData({
			admin: e.detail.value
		})
	},
	getMaxInput: function(e) {
		this.setData({
			max: e.detail.value
		})
	},

 
})
