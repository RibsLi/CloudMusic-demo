import {request} from './request'

// 获取最新mv
export function getNewMV(params) {
  return request({
    url: "/mv/first",
    params
  })
}
// 网易出品mv
export function getRcmd(params) {
  return request({
    url: "/mv/exclusive/rcmd",
    params
  })
}
// mv排行榜
export function getTopMV(params) {
  return request({
    url: "/top/mv",
    params
  })
}
// 全部mv
export function getAllMV(params) {
  return request({
    url: "/mv/all",
    params
  })
}