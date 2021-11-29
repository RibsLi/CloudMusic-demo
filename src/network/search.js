import {request} from './request'

// 搜索
export function getSearch(keywords, limit, type, offset,) {
  return request({
    url: "/cloudsearch",
    params: {
      keywords,
      limit,
      type,
      offset,
    }
  })
}
// 默认搜索关键词
export function getDefSearch() {
  return request({
    url: "/search/default"
  })
}
// 热搜列表(详细)
export function getHotSearch() {
  return request({
    url: "/search/hot/detail"
  })
}
// 搜索建议
export function getSuggest(keywords) {
  return request({
    url: "/search/suggest",
    params: {
      keywords
    }
  })
}