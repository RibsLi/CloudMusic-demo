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
// 发送/删除评论 后台更新结果很慢
export function submitComment(params) {
  return request({
    url: "/comment",
    // method: "post",
    params
  })
}
// 给评论点赞 后台更新结果很慢 只做了歌单的点赞
export function commentLike(params) {
  return request({
    url: "/comment/like",
    params
  })
}
// 收藏/取消收藏歌单
export function getPlaylistSub(params) {
  return request({
    url: "/playlist/subscribe",
    params
  })
}
// 收藏/取消收藏 MV
export function getMVSub(params) {
  return request({
    url: "/mv/sub",
    params
  })
}
// 收藏/取消收藏专辑
export function getAlbSub(params) {
  return request({
    url: "/album/sub",
    params
  })
}
// 收藏/取消收藏歌手
export function getArtistSub(params) {
  return request({
    url: "/artist/sub",
    params
  })
}