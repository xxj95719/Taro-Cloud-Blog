/*
 * @Description: 过滤器
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2020-07-08 16:21:57
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2020-07-21 15:31:56
 */

const filters = {
  getDate (date): Date {
    return date ? new Date(date) : new Date();
  },
  formateDate (date: Date, delimiter: string = '-'): string {
    const newDate = this.getDate(date);
    const Y = newDate.getFullYear() + delimiter;
    const M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + delimiter;
    const D = (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) + ' ';
    const h = newDate.getHours() + ':';
    const m = newDate.getMinutes();
    // const s = date.getSeconds(); // 秒
    const dateString = Y + M + D + h + m;
    return dateString;
  },
  beautifyDate (date: Date) {
    // time为时间戳
    const delta: number = (new Date().getTime() - new Date(date).getTime()) / 1000;
    if (delta / (60 * 60 * 24 * 365) > 1)
      return `${parseInt(String(delta / (60 * 60 * 24 * 365)))}年前`
    if (delta / (60 * 60 * 24 * 30) > 1)
      return `${parseInt(String(delta / (60 * 60 * 24 * 30)))}个月前`
    if (delta / (60 * 60 * 24 * 7) > 1)
      return `${parseInt(String(delta / (60 * 60 * 24 * 7)))}周前`
    if (delta / (60 * 60 * 24) > 1)
      return `${parseInt(String(delta / (60 * 60 * 24)))}天前`
    if (delta / (60 * 60) > 1) return `${parseInt(String(delta / (60 * 60)))}小时前`
    if (delta / 60 > 1) return `${parseInt(String(delta / 60))}分钟前`
    return '刚刚'
  }
}

export default filters