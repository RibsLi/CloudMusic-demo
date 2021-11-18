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
//获取所有歌曲列表
export function getSongDetail(...id) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}