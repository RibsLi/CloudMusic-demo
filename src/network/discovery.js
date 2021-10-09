import {request} from './request'

// 获取轮播图数据
export function getBanners() {
  return request({
    url: '/banner'
  })
}