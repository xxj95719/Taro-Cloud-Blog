/*
 * @Description: 云开发数据库操作封装
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2020-07-08 17:45:28
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2020-07-08 18:09:25
 */

import Taro from "@tarojs/taro";


const db = Taro.cloud.database();

interface Config {
  collection: string; // 集合名称
  skip: number; // 起始位置
  limit: number; // 限制条数
}
export async function dbGet (config: Config) {
  const articleCollection = db.collection(config.collection);
  try {
    const { data } = await articleCollection
      .skip(config.skip)
      .limit(config.limit)
      .get();
    return data
  } catch (error) {
    Taro.showToast({
      title: '数据返回出错',
      icon: 'none',
      duration: 2000
    })
    console.error(error)
  }
} 