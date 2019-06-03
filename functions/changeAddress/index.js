// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'bit-bbl1-ln1i2'
});

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  try {
    return await db.collection('addressTable').doc(event.id).update({
      // data 传入需要局部更新的数据
      data: {
        'sex': event.sex,
        'phoneNumber': event.tel,
        'lable': event.label,
        'address': event.address
      }
    })
  } catch (e) {
    console.error(e)
  }
}