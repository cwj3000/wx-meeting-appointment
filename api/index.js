const { request }  = require('../utils/request');

// 获取会议列表
function getMeetingList() {
  return request({
    url: '',
    method: 'GET'
  })
}

// 新增会议
function insertMeeting(params) {
  return request({
    url: '',
    method: 'POST',
    data: params
  })
}

// 删除会议
function deleteMeeting(id) {
  return request({
    url: '',
    method: 'DELETE',
    data: params
  })
}

// 更新会议
function updateMeeting(params) {
  return request({
    url: '',
    method: 'POST',
    data: params
  })
}