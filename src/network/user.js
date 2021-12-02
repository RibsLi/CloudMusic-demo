import {request} from './request'

// 获取用户详情
export function getUserDetail(uid) {
  return request({
    url: "/user/detail",
    params: {
      uid
    }
  })
}
//获取账号信息
export function getAccountInfo() {
  return request({
    url: "/user/account"
  })
}
// 获取用户歌单
export function getUserPlaylist(params) {
  return request({
    url: "/user/playlist",
    params
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount() {
  return request({
    url: "/user/subcount"
  })
}