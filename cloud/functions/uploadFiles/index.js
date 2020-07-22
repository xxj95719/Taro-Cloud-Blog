const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async (event) => {
  let timestamp = Date.parse(new Date());
  return await cloud.uploadFile({
    cloudPath: `images-roomType/${timestamp}/${Math.random().toString(36).substr(2)}`,
    fileContent: new Buffer(event.url, 'base64'),
  })
}