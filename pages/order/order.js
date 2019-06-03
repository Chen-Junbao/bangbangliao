var connect = require('../../connect.js')

Page({
  data: {
    imgUrls: [
      '/image/canteen1.png',
      '/image/canteen2.png'
    ],
    recommend: [
      {
        image: "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=35cc79c41a38534398c28f73f27adb1b/738b4710b912c8fcc3287c65f6039245d78821ba.jpg",
        site: "新食堂二楼",
        name: "黄焖鸡米饭",
        description: "口味：不辣、微辣、中辣、特辣"
      },
      {
        image: "http://img1.imgtn.bdimg.com/it/u=2393188447,1858471764&fm=26&gp=0.jpg",
        site: "二食堂",
        name: "山西肉酱面",
        description: "面十分筋道，肉酱入味"
      },
      {
        image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558254753&di=c01b48fb4531ddf9e254ce44c31ba32d&imgtype=jpg&er=1&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F4%2F7%2F1%2Fyuan_478e378633367d6469f81a24d4ae4191.jpg",
        site: "七食堂",
        name: "照烧鸡排饭",
        description: "同类：黑椒牛扒饭。。。"
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  navigateToDelivery: function (e) {
    //此处区分对应的跳转页面
    wx.navigateTo({
      url: './delivery/delivery'
    });
  },
  navigateToExpress: function (e) {
    //此处区分对应的跳转页面
    wx.navigateTo({
      url: './express/express'
    })
  },
  navigateToCanteen: function () {
    wx.navigateTo({
      url: './canteen/canteen'
    })
  },
  navigateToExpressInfo: function () {
    wx.navigateTo({
      url: './expressInfo/expressInfo'
    })
  }
})