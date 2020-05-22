/*
 * @Github: https://github.com/wangjiawei2019
 * @Date: 2020-05-22 10:33:55
 * @LastEditors: wjw
 * @LastEditTime: 2020-05-22 17:31:12
 */
export const toYMDHM = time => {
  // 2020-5-12 09:53
  const t = new Date(time * 1000)
  const Y = t.getFullYear()
  const M = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1
  const D = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
  const H = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
  const Min = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
  return `${Y}-${M}-${D} ${H}:${Min}`
}

export const toYMDHMS = time => {
  // 2020-05-13 13:20:59
  const t = new Date(time * 1000)
  const Y = t.getFullYear()
  const M = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1
  const D = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
  const H = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
  const Min = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
  const S = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
  return `${Y}-${M}-${D} ${H}:${Min}:${S}`
}
