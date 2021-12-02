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
export function getUserPlaylist(uid, limit, offset) {
  return request({
    url: "/user/playlist",
    params: {
      uid,
      limit,
      offset
    }
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount(cookie) {
  return request({
    url: "/user/subcount",
    method: "post",
    data: {
      cookie
    }
  })
}
// 获取已收藏专辑列表
export function getAlbumSub(limit, offset, cookie) {
  return request({
    url: "/album/sublist",
    method: "post",
    data: {
      limit, offset, cookie
    }
  })
}
// 收藏的歌手列表
export function getSingerSub(cookie) {
  return request({
    url: "/artist/sublist",
    method: "post",
    data: {
      cookie
    }
  })
}
// 收藏的 MV 列表
export function getMvSub(cookie) {
  return request({
    url: "/mv/sublist",
    method: "post",
    data: {
      cookie
    }
  })
}