const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 进入详情添加浏览记录，已存在则不重复添加
exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext()

    const res = await db.collection('browse-records')
      .where({
        articleId: event.articleId,
        _openid: wxContext.OPENID
      })
      .get();
    if (!res.data.length) {
      db.collection('browse-records')
        .add({
          data: {
            articleId: event.articleId,
            _openid: wxContext.OPENID
          },
        });

      return '浏览记录新增一条'
    }
    return `OPENID: ${wxContext.OPENID}，浏览记录已存在`
  } catch (error) {
    console.error(error)
  }
}