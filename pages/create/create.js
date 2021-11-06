// create.js
const mRequest = require('../../api/index')

Page({
	data: {
		form: [],
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
		this.initValidate() //验证规则函数
	},

	//报错 
	showModal(error) {
		wx.showModal({
			content: error.msg,
			showCancel: false,
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
		// this.WxValidate = new WxValidate(rules, messages)
	},

	// formSubmit:function(e) {
	// 	console.log('携带的数据为：', e.detail.value)
	// 	const params = e.detail.value
	// 	//校验表单
	// 	if (!this.WxValidate.checkForm(params)) {
	// 		const error = this.WxValidate.errorList[0]
	// 		this.showModal(error)
	// 		return false
	// 	}
	// 	this.showModal({
	// 		msg: '提交成功'
	// 	})
	// },

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

/* 	formSubmit: function(e) {
		let formData = e.detail.value;
		if(formData.beginTime = null) {
			wx.showToast({
				title: '提示',
				content: '开始时间不能为零！',
				icon: '',
				duration: 2000
			}) 
		} else {
			mRequest.insertMeetingRooms(formData).then(res => {
				console.log(JSON.stringify(formData));
				if(res.statusCode == 200) {
					if(res.data.code == 0) {
						// resolve(res.data);
						wx.showToast({
							title: '提示',
							content: res.data.msg,
							icon: 'none',
							duration: 2000
						});
						wx.navigateTo({
							url:'../index/index'
						})
					} else {
						wx.showToast({
							title: '提示',
							content: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				}
			}).catch(err => {
				rejects(err)
			})
		}
	}, */

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
				icon: 'none',
				duration: 2000
			})
		} else {
			mRequest.insertMeetingRooms(params).then(res => {
				console.log(JSON.stringify(params));
				if(res.statusCode == 200) {
					if(res.data.code = 0) {
						wx.showToast({
							title: '提示',
							content: res.data.msg,
							icon: 'none',
							duration: 2000
						});
						wx.navigateTo({
							url:'../index/index'
						})
					} else {
						wx.showToast({
							title: '提示',
							content: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
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
	}
 
})
