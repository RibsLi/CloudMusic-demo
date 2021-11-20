import {request} from './request'

// 获取精品歌单
export function getHighquality(params) {
  return request({
    url: "/top/playlist/highquality",
    params
  })
}
// 获取歌单分类列表
export function getCatlist(params) {
  return request({
    url: "/playlist/catlist",
    params
  })
}
// 歌单推荐列表
export function getTopPlayList(params) {
  return request({
    url: "/top/playlist",
    params
  })
}