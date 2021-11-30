import {request} from './request'

// 获取用户详情
export function getUserDetail(id) {
  return request({
    url: "/user/detail", 
    params: {
      id
    }
  })
}
//获取账号信息
export function getAccountInfo() {
  return request({
    url: "/user/account"
  })
}