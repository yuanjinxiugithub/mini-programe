const app = getApp();
Page({
  data: {
    addressObjects: [{
        id: "1",
        realname: "张三",
        city: "海淀区",
        region: "三环到四环之间",
        province: "北京",
        mobile: "13245678901",
        detail: "test",
        user: "张三",
        isDefault:true
      },
      {
        id: "1",
        realname: "李四",
        city: "海淀区",
        region: "三环到四环之间",
        province: "北京",
        mobile: "13245678901",
        detail: "test",
        user: "李四",
        isDefault: false
      }
    ]

  },
  onLoad: function(options) {
  },
  onReady: function() {

  },
  onShow: function() {

  },
  loadData: function() { // 加载网络数据，获取地址列表

  },
  add: function() {
    wx.navigateTo({
      url: '../add/add'
    });
  },

  setDefault: function(e) { //设置默认地址
    // 设置为默认地址
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
    // 遍历所有地址对象设为非默认
    var addressObjects = that.data.addressObjects;
    for (var i = 0; i < addressObjects.length; i++) {
      // 判断是否为当前地址，是则传true
     // addressObjects[i].set('isDefault', i == index)
    }
    // 提交网络更新该用户所有的地址
    // AV.Object.saveAll(addressObjects).then(function (addressObjects) {
      // 成功同时更新本地数据源
      // that.setData({
      //   addressObjects: addressObjects
      // });
      // 设置成功提示
    //   wx.showToast({
    //     title: '设置成功',
    //     icon: 'success',
    //     duration: 2000
    //   });
    // }, function (error) {
    //   // 异常处理
    // });
  },

  edit: function(e) {
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(this.data.addressObjects[index].id);
    // 取出id值
     var objectId = this.data.addressObjects[index].id;
     wx.navigateTo({
      url: '../add/add?objectId=' + objectId
     });
  },

  delete: function(e) {
    var that = this;
    // 取得下标
    var index = parseInt(e.currentTarget.dataset.index);
    // 找到当前地址AVObject对象
    var address = that.data.addressObjects[index];
    // 给出确认提示框
    wx.showModal({
      title: '确认',
      content: '要删除这个地址吗？',
      success: function(res) {
        if (res.confirm) {
          // 真正删除对象
          address.destroy().then(function(success) {
            // 删除成功提示
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            });
            // 重新加载数据
            that.loadData();
          }, function(error) {

          });
        }
      }
    })
  },

})