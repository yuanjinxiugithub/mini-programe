const app = getApp();
Page({
  data: {
    userInfo: {},
    userId: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function (options) {
      let vm = this;
      vm.getUserInfos();
  },

  getUserInfos: function () { //获取用户信息
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

  navigateToOrder:function(e){
    var status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '../../order/list/list?status=' + status
    });
  },

  navigateToAddress:function(e){
    wx.navigateTo({
      url: '../../address/list/list'
    });
  },
  
  navigateToAboutus:function(e){
    wx.navigateTo({
      url: '/pages/member/aboutus/about'
    }); 
  },
})