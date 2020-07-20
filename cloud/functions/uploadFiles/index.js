const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async (event) => {

  return await cloud.uploadFile({
    cloudPath: `images-roomType/${event.url.substring(event.url.lastIndexOf('/') + 1)}`,
    fileContent: new Buffer(event.url, 'base64'),
  })
}