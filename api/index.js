const { request }  = require('../utils/request');

/**
 * 获取全部会议室列表
 */
function getMeetingRoomsList() {
  return request({
    url: '/manager/meetingRooms', 
    method: 'GET'
  })
}

/**
 * @description 查询会议室
 * @param {*} params 
 */
function getMeetingRoomIds(params) {
  return request({
    url: '/manager/meetingRooms?keyword=' + params,
    method: 'GET',
    params: params
  })
}

/**
 * @description 新增会议室
 * @param {*} params 
 */
function insertMeetingRooms(params) {
  return request({
    url: '/manager/meetingRooms',
    method: 'POST',
    data: params
  })
}

/**
 * @description 更新会议室
 * @param {*} params 
 */
function updateMeetingRooms(params) {
  return request({
    url: '/manager/meetingRooms',
    method: 'PUT',
    data: params
  })
}


/**
 * @description 删除会议室
 * @param {*} id 
 */
function deleteMeetingRooms(id) {
  return request({
    url: '/manager/meetingRooms?&id=' + id,
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