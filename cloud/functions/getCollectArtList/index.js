const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event) => {

  return await db.collection('collect_records').aggregate()
    .lookup({
      from: 'article',
      localField: "articleId",
      foreignField: "_id",
      as: 'artInfo'
    })
    .match({
      _openid: event.userInfo.openid
    })
    .end()
}