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