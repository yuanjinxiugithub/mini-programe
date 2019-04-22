 // 获取当前地理位置
const getLgetLocal = (qqmapsdk,latitude, longitude,successCallBack,failCallBack,completeCallBack)=>{
  let vm = this;
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    success: function (res) {
      successCallBack(res);
    },
    fail: function (res) {
      if (failCallBack) {
        failCallBack(res)
      }
    },
    complete: function (res) { 
      if (completeCallBack) {
        completeCallBack(res)
      }
    }
  });
};

// 微信获得经纬度
const getLocation = (qqmapsdk,successCallBack, failCallBack, completeCallBack)=>{
  let vm = this;
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy;
      getLgetLocal(qqmapsdk,latitude, longitude, successCallBack,failCallBack, completeCallBack);
    },
    fail: function (res) {
      console.log('fail' + JSON.stringify(res))
    }
  });
};

module.exports = {
  getLocation: getLocation
}






 