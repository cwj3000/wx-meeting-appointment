// edit.js
const util = require('../../utils/util.js')

Page({
	data: {
		form: [],
		name: '',
		id: '',
		unit: '',
		appointmenter: '',
		speaker: '',
		host: '',
		beginTime: '',
		endTime: ''
	},

	onLoad(options) {
		let that = this;
		if(options.id==undefined) {
			return;
		}
		that.setData({
			id: options.id,
			// name: options.name,
			// speaker: options.speaker,
			// host: options.host,
			// beginTime: options.beginTime,
			// endTime: options.endTime,
			// unit: options.unit
		})
		wx.request({
			url: '',
			data: {
				id: options.id,
				// name: options.name,
				// speaker: options.speaker,
				// host: options.host,
				// beginTime: options.beginTime,
				// endTime: options.endTime,
				// unit: options.unit,
			},
			method: 'POST',
			success: function(res) {
				console.log(res);
				let result = res.data;
				if(result == undefined) {
					wx.showToast({
						title: '获取数据失败',
						icon: 'loading',
						duration: 3000					
					})
				} else {
					that.setData({
						name: result.name,
						unit: result.unit,
						speaker: result.speaker,
						appointmenter: result.appointmenter,
						beginTime: result.beginTime,
						endTime: result.endTime,
						host: result.host
					})
				}
			}
		})

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
