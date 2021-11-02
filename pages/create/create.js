// create.js
const util = require('../../utils/util.js')

Page({
	data: {
		form: [],
	},
	onLoad() {
		this.setData({
			logs: (wx.getStorageSync('logs') || []).map(log => {
				return {
					date: util.formatTime(new Date(log)),
					timeStamp: log
				}
			})
		})
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

	formSubmit(e) {
		console.log('携带的数据为：', e.detail.value)
		const params = e.detail.value
		//校验表单
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		}
		this.showModal({
			msg: '提交成功'
		})
	},


})
