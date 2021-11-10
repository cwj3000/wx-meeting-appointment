Page({
	data: {
		checked: false, // radio是否选中
		confereeData1: [{
				id: 1,
				label: '李后端',
				value: '后端',
				checked: "true"
			},
			{
				id: 2,
				label: '邓IOS',
				value: 'IOS',
				checked: "false"
			},
			{
				id: 3,
				label: 'Android',
				value: 'Android',
				checked: "true"
			},
			{
				id: 4,
				label: '李前端',
				value: '前端',
				checked: "true"
			},
			{
				id: 5,
				label: '李后端',
				value: '后端',
				checked: "true"
			},
			{
				id: 6,
				label: '李产品',
				value: '产品',
				checked: "fasle"
			},
			{
				id: 7,
				label: '李测试',
				value: '测试',
				checked: "false"
			},
			{
				id: 8,
				label: '陈UI',
				value: 'UI',
				checked: "true"
			},
			{
				id: 9,
				label: '赵架构',
				value: '架构',
				checked: "false"
			}
			/* ,
						{
							id: 10,
							label: '王运维',
							value: '运维',
							checked: "true"
						}	,
						{
							id:10,
							label: '赵架构',
							value: '架构',
							checked: "false"
						},
						{
							id: 11,
							label: '王运维',
							value: '运维',
							checked: "true"
						},
						{
							id:12,
							label: '赵架构',
							value: '架构',
							checked: "false"
						},
						{
							id: 13,
							label: '王运维',
							value: '运维',
							checked: "true"
						},
						{
							id:14,
							label: '赵架构',
							value: '架构',
							checked: "false"
						},
						{
							id: 15,
							label: '王运维',
							value: '运维',
							checked: "true"
						},
						{
							id:16,
							label: '赵架构',
							value: '架构',
							checked: "false"
						},
						{
							id: 17,
							label: '王运维',
							value: '运维',
							checked: "true"
						} */
		],
		confereeData: [{
				id: 1,
				label: '李小猫',
				value: '李小鱼',
				checked: "true"
			},
			{
				id: 2,
				label: '陈小猫2',
				value: '李小鱼2',
				checked: "true"
			},
			{
				id: 3,
				label: '赵小猫3',
				value: '李小鱼3',
				checked: "true"
			},
			{
				id: 4,
				label: '李小猫4',
				value: '李小鱼4',
				checked: "true"
			},
			{
				id: 5,
				label: '王小猫5',
				value: '李小鱼5',
				checked: "true"
			},
			{
				id: 6,
				label: '李小猫6',
				value: '李小鱼6',
				checked: "true"
			},
			{
				id: 7,
				label: '黄小猫7',
				value: '李小鱼7',
				checked: "true"
			},
			{
				id: 8,
				label: '马小猫8',
				value: '李小鱼8',
				checked: "true"
			},
			{
				id: 9,
				label: '赵小猫9',
				value: '李小鱼9',
				checked: "true"
			}
		], //全部人员数据
		isSelectAll: true // 是否全选
	},

	checked(){
		var check = this.data.checked;
		if (check) {
			this.data.checked = false;
		} else {
			this.data.checked = true;
		}
		this.setData({
			checked: this.data.checked,
		});
	},

	onLoad() {
		console.log("onLoad")
	},

	// 全选与反全选
	selectAll() {
		var that = this;
		for (let i = 0; i < that.data.confereeData.length; i++) {
			that.data.confereeData[i].checked = (!that.data.isSelectAll)
		}
		that.setData({
			confereeData: that.data.confereeData,
			isSelectAll: (!that.data.isSelectAll)
		})
	},

	// 	参会人员全部人员数据
	rselectAll() {
		var that = this;
		for (let i = 0; i < that.data.confereeData1.length; i++) {
			that.data.confereeData1[i].checked = (!that.data.isSelectAll)
		}
		that.setData({
			confereeData1: that.data.confereeData1,
			isSelectAll: (!that.data.isSelectAll)
		})
	},

	// 移除参会人员
	deleteConferee(e) {
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
								that.data.confereeData.splice(e.target.dataset.index,1);
								that.setData({
									confereeData:that.data.confereeData
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

	// 搜索人员数据
	toSearch() {},

})