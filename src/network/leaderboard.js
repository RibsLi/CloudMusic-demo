import {request} from './request'

// 所有榜单
export function getToplist() {
  return request({
    url: "/toplist"
  })
}