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