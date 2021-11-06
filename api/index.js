const { request }  = require('../utils/request');

// 获取全部会议室列表
function getMeetingRoomsList() {
  return request({
    url: '/manager/meetingRooms', 
    method: 'GET'
  })
}

// 查询会议室
function getMeetingRoomIds(params) {
  return request({
    url: '/manager/meetingRooms',
    method: 'GET',
    params: params
  })
}

// 新增会议室
function insertMeetingRooms(params) {
  return request({
    url: '/manager/meetingRooms',
    method: 'POST',
    data: params
  })
}

// 更新会议室
function updateMeetingRooms(params) {
  return request({
    url: '/manager/meetingRooms',
    method: 'PUT',
    data: params
  })
}

// 删除会议室
function deleteMeetingRooms(id) {
  return request({
    url: '/manager/meetingRooms',
    method: 'DELETE',
    params: id
  })
}


module.exports = {
  getMeetingRoomsList,
  insertMeetingRooms,
  deleteMeetingRooms,
  updateMeetingRooms,
  getMeetingRoomIds
}