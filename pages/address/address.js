var connect = require('../../connect.js')
// pages/address/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'addressInfoList': []
  },

  onShow: function (e) {
    this.setData({
      'addressInfoList': []
    });
    connect.changeAddressPage(this);
  },

  edit_address: function (e) {
    //e.currentTarget.id 为 addressInfoList 中的id
    ////console.log(e.currentTarget.id);
    connect.changeTabIndex(e.currentTarget.id);
    wx.navigateTo({
      url: '../address/edit_address/edit_address?id=' + e.currentTarget.id,
    });
  },

  add_address: function (options) {
    wx.navigateTo({
      url: '../address/add_address/add_address',
    })
  },

  //删除
  delete_address: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          ////console.log('用户点击确定');
          //数据库操作
          connect.deleteAddress(e.currentTarget.id);
          setTimeout(
            function () {
              that.onShow();
            }, 1000)
        } else if (res.cancel) {
          ////console.log('用户点击取消');
        }
      }
    })
  }
})