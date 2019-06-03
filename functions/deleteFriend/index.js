const cloud = require('wx-server-sdk')

cloud.init({
  env: 'bit-bbl1-ln1i2'
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('chatDataTable').where(_.or([{
      wxNumber1: event.name,
      wxNumber: event.myname,
    }, {
        wxNumber: event.name,
        wxNumber1: event.myname,
    }
    ])
    ).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  } catch (e) {
    console.error(e)
  }
}