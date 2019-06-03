// pages/contact/contact.js
const app = getApp();
var connect = require('../../../connect.js');
const db = wx.cloud.database({});
const chatDataTable = db.collection('chatDataTable')//云端数据初始化
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '嘿嘿嘿'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,  //此处ID因为唯一标识ID（openID？）
    scrollHeight: '100vh',
    inputBottom: 0,
    contHeadIcon: '/image/friend.png',
    cusHeadIcon: '/image/friend.png',
    ss: [],
    headIcon:[],
    timerTask: null,//循环监听
    msgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(id) {
    const _ = db.command;
    var that = this;
    db.collection('chatDataTable').get({
      success(res) {
        //console.log("resdata:" + res.data)
      }
    })
    this.data.id = id;
    //console.log("id:", this.data.id["id"]);
    var testid = this.data.id["id"];
    app.globalData.otherid = testid;

    that.data.timerTask = setInterval(function () {
      //initData(this);
      db.collection('chatDataTable').where(_.or([{
        wxNumber: getApp().globalData.userInfo["nickName"],
        wxNumber1: getApp().globalData.otherid
      },
      {
        wxNumber1: getApp().globalData.userInfo["nickName"],
        wxNumber: getApp().globalData.otherid
      }
      ])).get({
        success: res => {
          //   queryResult = JSON.stringify(res.data, null, 2)
          that.setData({
            ss: res.data
          })
          //console.log('[数据库] [查询记录] 成功：', res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '当前网络信号差'
          })
          console.error('网l：', err)
        }
      }),
//
      db.collection('userTable').where({
        name: getApp().globalData.otherid
        }
        ).get({
        success: res => {
          //   queryResult = JSON.stringify(res.data, null, 2)
          that.setData({
            headIcon: res.data[0].avatar
          })
          console.log("head",res.data)
          //console.log('[数据库] [查询记录] 成功：', res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '当前网络信号差'
          })
          console.error('网l：', err)
        }
      })
      console.log("hhh", that.data.headIcon)
      that.setData({
        contHeadIcon: that.data.headIcon,
      })
      //console.log("ss11:", that.data.ss);
      var a = [];
      for (var qq in that.data.ss) {
        if (that.data.ss[qq]["wxNumber"] == getApp().globalData.userInfo["nickName"]) {
          let dictObject = {
            speaker: 'customer',
            contentType: 'text',
            content: that.data.ss[qq]["chatContent"],
          };

          a.push(dictObject);
          that.setData({
            msgList: a,
          })
        }
        else {
          let dictObject = {
            speaker: 'server',
            contentType: 'text',
            content: that.data.ss[qq]["chatContent"],
          };

          a.push(dictObject);
          that.setData({
            msgList: a,
          })
        }
      }
      //console.log("mglist", a);
    }, 3000)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
 //   msgList.push({
   //   speaker: 'customer',
  //   contentType: 'text',
   //   content: e.detail.value
  //  })
    let mm = {
      speaker: app.globalData.userInfo["nickName"],
      //contentType: 'text',
      content: e.detail.value
    }
    inputVal = '';
    this.setData({
      //   msgList,
      inputVal
    });
    connect.chatTable1(mm);
    connect.findchatTable1(mm);


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
