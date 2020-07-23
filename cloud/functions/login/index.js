const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext()

    const res = await db.collection('user_info')
      .where({
        _openid: wxContext.OPENID
      })
      .get();

    if (!res.data.length) {
      await db.collection('user_info')
        .add({
          data: Object.assign(event.userInfo, { _openid: wxContext.OPENID }),
        });
      return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      }
    }
    return {
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }

  } catch (error) {
    console.error(error)
  }

}