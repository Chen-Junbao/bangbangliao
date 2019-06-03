var connect = require('../../../connect.js');

Page({
  data: {
    deliveryInfo: []
  },

  onLoad:function(e){
    this.setData({ deliveryInfo: [] });
    connect.changeMyOrder(this, '快递');

  },

  onShow: function (e) {
    this.setData({ deliveryInfo: [] });
    connect.changeMyOrder(this, '快递');
    ////console.log(this.data.deliveryInfo);
  },

  //跳转下单界面
  make_order: function (e) {
    wx.navigateTo({
      url: '../../order/make_order/make_order',
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      that.onShow()
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    ////console.log("下拉刷新")
  },

  //删除
  delete_order: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          ////console.log('用户点击确定');
          //数据库操作
          connect.deleteOrder(e.currentTarget.id);
          //刷新
          that.onPullDownRefresh();
        } else if (res.cancel) {
          ////console.log('用户点击取消');
        }
      }
    })
  }
})