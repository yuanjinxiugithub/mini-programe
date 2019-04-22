// 常用的ajax请求Util
const loadJson = (ajaxType, url, params, successCallBack, failCallBack, completeCallBack) => {
  //设置默认数据传数格式
  var methonType = "application/json";
  //判断请求方式
  if (ajaxType === 'PUT') {
    var p = Object.keys(params).map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
    url += '?' + p;
    params = {}
  }
  if (ajaxType == "POST") {
    methonType = "application/x-www-form-urlencoded"
  }
  wx.request({//开始正式请求
    url: url,
    method: ajaxType,
    header: {
      'content-type': methonType,
    },
    data: params,
    //成功回调
    success: (res) => {
      successCallBack(res)
    },
    //错误回调
    error(res) {
      //检测是否传参errorData，如果有则执行回调errorData(res)
      if (failCallBack) {
        failCallBack(res)
      }
    },
    //检测是否传参completeData，如果有则执行回调completeData(res)
    complete(res) {
      if (completeCallBack) {
        completeCallBack(res)
      }
    }
  });
};

module.exports = {
  loadJson:loadJson,
}