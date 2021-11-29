import {request} from './request'

// 二维码 key 生成接口
export function getQrKey() {
  return request({
    url: "/login/qr/key",
    method: "post",
  })
}
// 二维码生成接口
export function getQrCreate(key, qrimg) {
  return request({
    url: "/login/qr/create",
    method: "post",
    data: {
      key,
      qrimg
    }
  })
}


// 邮箱登录
export function login(email, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      email,
      password
    }
  })
}