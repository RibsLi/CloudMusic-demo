import {request} from './request'

// 获取轮播图数据
export function getBanners() {
  return request({
    url: '/banner'
  })
}
// 推荐歌单
export function getRecommend(limit) {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}
// 获取歌单详情
export function getPlaylistDetail(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}
//独家放送数据
export function getPersonalized(params) {
  return request({
    url: "/personalized/privatecontent/list",
    params
  })
}
// 最新音乐
export function getTopSong(params) {
  return request({
    url: "/top/song",
    params
  })
}
// 新碟上架
export function getAlbum(params) {
  return request({
    url: "/top/album",
    params
  })
}
// 推荐mv
export function getRecommendMV() {
  return request({
    url: "/personalized/mv"
  })
}
