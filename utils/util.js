const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * @deprecated 获取当前选中的item
 * @param {*} e 
 * @param {*} key 
 */
const $attr = (e, key) => {
  return e.currentTarget.dataset[key]
}


/**
 * 判断会议状态
 * @param {*} begin 
 * @param {*} end 
 */
const CompareDate = (begin, end) => {
  var date = new Date();
  var curDate = (date.getHours() + ":" + date.getMinutes()).split(":");
  var beginDate = begin.split(":");
  var endDate = end.split(":");
  var curTime = date.setHours(curDate[0], curDate[1]);
  var beginTime = date.setHours(beginDate[0], beginDate[1]);
  var endTime = date.setHours(endDate[0], endDate[1]);
  
  if (curTime < beginTime) {
    return 0 // '未开始'
  }
  if (curTime >= beginTime && curTime < endTime) {
    return 1 // '进行中'
  }
  if (curTime >= endTime) {
    return 2 // '已结束'
  }
}

module.exports = {
  formatTime,
  CompareDate,
  $attr
}