const app = getApp();
Page({
  data: {
    orders: [],
  },

  onLoad: function (options) {
    // 订单状态，已下单为0，已付为1，已发货为2，已收货为3
    var status = parseInt(options.status);
		// 存为全局变量，控制支付按钮是否显示
    console.log(status);
  },

  onReady: function () {

  },

  onShow: function () {

  },

})