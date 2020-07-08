/*
 * @Description: 过滤器
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2020-07-08 16:21:57
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2020-07-08 16:50:44
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
    console.log('dateString', dateString); // > dateString 2020-01-10 18:52
    return dateString;
  }
}

export default filters