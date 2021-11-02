
const baseURL = '';

/**
 *  使用Promise 对wx.request进行分装
 * @param {*} params 
 */

function request(params = { methods, url, data }) {
  return  new Promise(function (resolve,reject) {
    wx.request({
      url: baseURL + params.url,
      method: params.method,
      data: params.data ? JSON.stringify(params.data) : null,
      header: { 'content-type': 'application/json' },
      success(res) {
        const { code } = res.data
        if (code !== '-1') {
          // 请求成功
          resolve(res)
        } else {
          // 请求错误
          reject('请求错误！')
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request: request
}