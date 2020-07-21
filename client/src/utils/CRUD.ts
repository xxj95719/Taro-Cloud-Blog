/*
 * @Description: 云开发数据库操作封装
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2020-07-08 17:45:28
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2020-07-21 14:47:48
 */

import Taro from "@tarojs/taro";


const ERR_CODE_LIST = {
  '-501017': '磁盘耗尽',
  '-501018': '资源不可用',
  '-502001': '数据库请求失败',
  '-502002': '非法的数据库指令',
  '-502003': '无权限操作数据库',
  '-502011': '操作超时',
  '-601001': '系统错误',
  '-601002': '系统参数错误',
  '-601003': '系统网络错误',
};
// 连接数据库
const db = Taro.cloud.database();

interface Collection {
  readonly collection: string;
}
interface AddConfig extends Collection {
  data: object // 增：插入内容；
}
interface DelConfig extends Collection {
  where: object // 删：根据条件删除记录
}
interface UpdateConfig extends Collection {
  data: object // 改：局部更新内容
  where?: object // 改：条件
}
interface GetConfig extends Collection {
  skip: number; // 查：起始位置
  limit?: number; // 查：限制条数
  where?: object; // 查：条件
  key?: string;
  sort?: 'asc' | 'desc'; // 根据【key】按照【sort】排序
}


// 增
export async function dbAdd (config: AddConfig): Promise<Boolean> {
  const configCollection = db.collection(config.collection);
  try {
    const res = await configCollection
      .add({ data: config.data })
    console.log(`${config.collection}数据add : `, res)
    return true
  } catch (error) {
    const { errCode } = error;
    Taro.showToast({
      title: ERR_CODE_LIST[errCode] || '新增数据出错',
      icon: 'none',
      duration: 2000
    })
    console.error(error)
    return false
  }
}
// 删（单条记录）
export async function dbDelete (config: DelConfig): Promise<Boolean> {
  const configCollection = db.collection(config.collection) as any;
  try {
    // 删除一条数据
    const res = await configCollection
      .where(config.where).remove();

    console.log(`${config.collection}数据delete : `, res)
    return true

  } catch (error) {
    const { errCode } = error;
    Taro.showToast({
      title: ERR_CODE_LIST[errCode] || '数据删除出错',
      icon: 'none',
      duration: 2000
    })
    console.error(error)
    return false

  }
}
// 改（单条记录）
export async function dbUpdate (config: UpdateConfig): Promise<Boolean> {
  const configCollection = db.collection(config.collection) as any;
  try {
    const res = await configCollection
      .where(config.where).update({ data: config.data });

    console.log(`${config.collection}数据update : `, res)
    return true

  } catch (error) {
    const { errCode } = error;
    Taro.showToast({
      title: ERR_CODE_LIST[errCode] || '数据更新出错',
      icon: 'none',
      duration: 2000
    })
    console.log(error.errCode)
    return false

  }
}
// 查
export async function dbGet (config: GetConfig) {
  let configCollection
  if (config.key && config.sort) {
    configCollection = db.collection(config.collection).orderBy(config.key, config.sort);
  } else {
    configCollection = db.collection(config.collection)
  }
  try {
    let res
    if (config.where && config.limit) {
      res = await configCollection

        .skip(config.skip)
        .limit(config.limit)
        .where(config.where)
        .get();
    } else if (config.limit) {
      res = await configCollection
        .skip(config.skip)
        .limit(config.limit)
        .get();
    } else if (config.where) {
      res = await configCollection
        .skip(config.skip)
        .where(config.where)
        .get();
    } else {
      res = await configCollection
        .get();
    }

    console.log(`${config.collection}数据get : `, res.data)


    return res.data
  } catch (error) {
    const { errCode } = error;
    Taro.showToast({
      title: ERR_CODE_LIST[errCode] || '数据查询出错',
      icon: 'none',
      duration: 2000
    })
    console.error(error)
  }
}


