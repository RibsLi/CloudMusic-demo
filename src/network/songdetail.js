import {request} from './request'

// 获取歌单详情
export function getPlaylistDetail(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}
// 获取我喜欢的歌单详情 必须带cookie
export function getPlaylistDetailCookie(id, cookie) {
  return request({
    url: "/playlist/detail",
    method: "post",
    data: {
      id,
      cookie
    }
  })
}
//获取所有歌曲列表
export function getSongDetail(...id) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}
// 获取音乐url
// export function getSongURL(...id) {
//   return request({
//     url: `/song/url?id=${id}`
//   })
// }
export function getSongURL(id) {
  return request({
    url: "/song/url",
    params: {
      id
    }
  })
}
// 获取歌词
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  })
}
//获取热门评论
export function getHotComment(params) {
  return request({
    url: "/comment/hot",
    params
  })
}
// 获取所有评论
export function getComment(params) {
  return request({
    // url: "/comment/new",
    url: "comment/playlist",
    params
  })
}
// 获取楼层评论
export function getFloor(params) {
  return request({
    url: "/comment/floor",
    params
  })
}
//获取收藏者
export function getSubscribers(params) {
  return request({
    url: "/playlist/subscribers",
    params
  })
} 
