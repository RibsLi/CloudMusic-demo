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
// 获取mv的url地址
export function getMVUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id
    }
  })
}
// 获取mv详情
export function getMVDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid
    }
  })
}
// 获取mv评论信息
export function getComment(params) {
  return request({
    url: "/comment/mv",
    params
  })
}
// 获取mv热门评论
export function getHotComment(params) {
  return request({
    url: "/comment/hot",
    params
  })
}