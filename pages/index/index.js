//index.js
//获取应用实例
const app = getApp();
//模块化加载js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var util = require("../../utils/util.js");
var AjaxLoad = require("../../utils/ajaxUtil.js");
var UserLocation = require("../../utils/getUserLocalUtil.js");
var qqmapsdk;
Page({
  data: {
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner2.jpg',
      '/images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    province: "",
    city: ""
  },
  onLoad: function() {
    var parent = this;
    var content = {hourTip: parent.getNowHourTip()};
    parent.setData(content);
    parent.getUserInfos();
    qqmapsdk = new QQMapWX({key: app.globalData.qqmapsdkKey });
  },

  onShow: function() {
    let vm = this;
    vm.getUserLocation();
  },

  testLoadJson: function() {
    AjaxLoad.loadJson("GET", "http://127.0.0.1:8080/wx/test", {}, (res) => {
      console.log(res); // //成功函数回调区间，必写
    });
  },

  loadBanner: function() { //从服务器端加载轮播图

  },

  getNowHourTip: function() {
    var hour = util.formatHour(new Date());
    if (hour < 6) {
      return "凌晨好！";
    } else if (hour < 12) {
      return "上午好！";
    } else if (hour < 14) {
      return "中午好！";
    } else if (hour < 17) {
      return "下午好！";
    } else if (hour < 19) {
      return "傍晚好！";
    } else if (hour < 22) {
      return "晚上好！";
    } else {
      return "夜里好！";
    }
  },

  getUserInfos: function() { //获取用户信息
    var parent = this;
    if (app.globalData.userInfo) {
      parent.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (parent.data.canIUse) { // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    } else {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        },
        fail: res => {
          console.log(res);
        }
      });
    }
  },

  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      vm.getLocationUtil();//再次授权，调用wx.getLocation的API
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          vm.getLocationUtil();   //调用wx.getLocation的API
        } else {
          vm.getLocationUtil();//调用wx.getLocation的API
        }
      }
    })
  },

  getLocationUtil:function(){
    let vm = this;
    UserLocation.getLocation(qqmapsdk,(res)=>{
      let province = res.result.ad_info.province
      let city = res.result.ad_info.city
      vm.setData({
        province: province,
        city: city,
      });
    });
  },

  redicToMember: function(e) { //我的会员
    var parent = this;
    wx.navigateTo({
      url: ""
    });
  },

  redicToOrder: function(e) { //我的订单
    var parent = this;
    wx.navigateTo({
      url: "../order/list/list"
    });
  },

  redicToAddress: function(e) { //我的地址
    var parent = this;
    wx.navigateTo({
      url: "../address/list/list"
    });
  },

  redictToGoods: function(e) { //商城
    var parent = this;
    wx.navigateTo({
      url: "../goods/list/list"
    });
  },

})