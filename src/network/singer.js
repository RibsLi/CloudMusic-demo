import {request} from './request'

// 歌手分类列表
export function getArtist(params) {
  return request({
    url: "/artist/list",
    params
  })
}
// 获取歌手详情
export function getArtistDetail(id) {
  return request({
    url: "/artist/detail",
    params: {
      id
    }
  })
}
// 获取歌手专辑
export function getAlbum(id) {
  return request({
    url: "/artist/album",
    params: { 
      id
    }
  })
}
// 获取专辑内容
export function getAlbumContent(id) {
  return request({
    url: "/album",
    params: {
      id
    }
  })
}
// 获取歌手mv
export function getArtistMV(id) {
  return request({
    url: "/artist/mv",
    params: {
      id
    }
  })
}
// 获取歌手描述
export function getArtistDesc(id) {
  return request({
    url: "/artist/desc",
    params: {
      id
    }
  })
}
// 获取相似歌手
export function getSimiArtist(id) {
  return request({
    url: "/simi/artist",
    params: {
      id
    }
  })
}
// 获取专辑评论
export function getAlbumComment(params) {
  return request({
    url: "/comment/album",
    params
  })
}