var connect = require('../../connect.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    count: {
      'delivery': '',
      'express': '',
      'friend': ''
    }
  },

  onReady: function () {

  },

  onShow:function(){
    connect.changeCount(this);
  },

  //转到收货地址页面
  address: function (options) {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  //转到服务中心
  server_center: function (options) {
    wx.navigateTo({
      url: '../mine/server_center/server_center',
    })
  },

  //转到帮助反馈
  feedback: function (options) {
    wx.navigateTo({
      url: '../mine/feedback/feedback',
    })
  },

  //转到规则中心
  rule: function (options) {
    wx.navigateTo({
      url: '../mine/rule/rule',
    })
  },

  //转到推荐有奖
  recommend: function (options) {
    wx.navigateTo({
      url: '../mine/recommend/recommend',
    })
  },

  //跳转好友聊天界面
  chat: function (options) {
    wx.switchTab({
      url: '../chat/chat',
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function (e) {
  },

  navigateToMyDelivery: function (e) {
    wx.navigateTo({
      url: '../mine/delivery/delivery'
    })
  },

  navigateToMyExpress: function (e) {
    wx.navigateTo({
      url: '../mine/express/express'
    })
  },
})
