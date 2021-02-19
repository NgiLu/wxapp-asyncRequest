const convertR = (url, options) => {
  var tmpHeader = {};
  if (options.method) {
    tmpHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
  }

  if (options.queryParams) {
    url += '?';
    for (let dataKey in options.queryParams) {

      let tempValue = options.queryParams[dataKey]

      if (tempValue !== undefined) {
        if (Array.isArray(tempValue)) {
          url += `${dataKey}=${tempValue.join(',')}&`
        } else {
          url += `${dataKey}=${tempValue}&`;
        }
      }
    }
    delete options.queryParams;
  }

  if (options.pathParams) {
    for (let paramKey in options.pathParams) {

      if (options.pathParams[paramKey] !== undefined)
        url = url.replace(`{${paramKey}}`, options.pathParams[paramKey]);
    }
    delete options.pathParams;
  }
  return {
    url: encodeURI(url),
    header: tmpHeader,
    data: options.data,
    method: options.method ? options.method : 'GET',
  }
}

const asyncRequest = async (url, options = {}) => {
  if (!Reflect.has(options, "hiddenLoading")) {
    Reflect.set(options, "hiddenLoading", true)
  }
  if (!Reflect.has(options, "showErr")) {
    Reflect.set(options, "showErr", true)
  }
  let tmpOptions = convertR(url, options);
  let ret = await new Promise((resolve, reject) => {
    wx.request({
      ...tmpOptions,
      success: async function (res) {
        if (res && res.statusCode == 200) {
          options.success && options.success(res.data)
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: function (res) {
        if (options.showErr) {
          _show_error('-99', '网络错误，请稍后重试')
          res.data = {
            message: '网络错误，请稍后重试'
          }
        }
        options.fail && options.fail(res)
        reject(res)
      },
      complete: function (res) {
        if (options.hiddenLoading) {
          wx.hideLoading()
        }
        options.complete && options.complete(res)
      }
    })
  })
  return ret;
}

const _show_error = (error_code, message) => {
  wx.showToast({
    title: `${message}` + `(错误码:${error_code})`,
    icon: 'none',
    duration: 2000
  })
}

export { asyncRequest }