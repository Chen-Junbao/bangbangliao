var connect = require('../../connect.js');
var app = getApp();
var db = wx.cloud.database();
var chatTable = db.collection('chatDataTable');
Page({
  data: {
    ss: [ ],
    chatInfoList: [],
    timerTask: null,//循环监听
    contHeadIcon: '/image/friend.png',
    headIcon: [],
  },

  // onHide: function () {
  //写在onHide()中，切换页面或者切换底部菜单栏时关闭定时器。
  //  clearInterval(this.data.timerTask);
  //},
  onLoad: function () {
    const _ = db.command;
    var that = this;
    that.data.timerTask = setInterval(function () {
      //  var queryResult= JSON.stringify(connect.getchatdata().data, null, 2)
      //  connect.getchatdata();
      chatTable.where(_.or([{
        wxNumber1: getApp().globalData.userInfo["nickName"]
      }, {
        wxNumber: getApp().globalData.userInfo["nickName"]
      }
      ]))
   //     .skip(0)
        .limit(30)
        .get({
          success: res => {
            //   queryResult = JSON.stringify(res.data, null, 2)
            that.setData({
              ss: res.data
            })
            //console.log("lohhh:", res.data)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      var qq = [];
      var cc = [];
      for (var i = that.data.ss.length - 1; i >= 0; i--) {
        qq.push(that.data.ss[i]);
      }
      var jj = [0];
      //console.log("qqqqq:", qq)
      for (var item in qq) {
        for (var j in jj) {
          if (qq[item]["wxNumber"] == jj[j] || qq[item]["wxNumber1"] == jj[j]) {
            break;
          }
          else if (qq[item]["wxNumber"] != jj[j] && qq[item]["wxNumber"] != getApp().globalData.userInfo["nickName"] && jj[j] == 0) {
            jj.unshift(qq[item]["wxNumber"])
            qq[item]["id"] = qq[item]["wxNumber"]
            cc.push(qq[item])
            break;
          }
          else if (qq[item]["wxNumber1"] != jj[j] && qq[item]["wxNumber1"] != getApp().globalData.userInfo["nickName"] && jj[j] == 0) {
            jj.unshift(qq[item]["wxNumber1"])
            qq[item]["id"] = qq[item]["wxNumber1"]
            cc.push(qq[item])
            break;
          }
        }
      }
      for(var t in cc){  
        ////
        db.collection('userTable').where({
          name: cc[t]["id"]
        }
        ).get({
          success: res => {
            //   queryResult = JSON.stringify(res.data, null, 2)
            that.setData({
              headIcon: res.data[0].avatar
            })
            console.log("head", res.data)
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
     //   that.setData({
     //     contHeadIcon: that.data.headIcon,
     //   })
        cc[t]["pic"] = that.data.headIcon
      //////
      }
      that.setData({
        chatInfoList: cc,
      })
      

      //循环执行代码 
    }, 2000)
  },

  //跳转添加好友界面
  addFriend: function (options) {
    wx.navigateTo({
      url: '../order/addFriend/addFriend',
    })
  },

  deleteFriend: function (event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        // friendName 为要删除的好友名称
        connect.deleteFriend(friendName);
        break;
    }
  }

  navigateToChatUI: function (e) {
    wx.navigateTo({
      url: './chatui/chatui?id=' + e.currentTarget.id
    });

  }
})
