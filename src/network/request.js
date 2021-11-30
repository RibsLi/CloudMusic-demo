import axios from 'axios'

//创建网络请求
export function request(config) {
  const instanca = axios.create({
    baseURL: 'https://lianghj.top:3000',
    timeout: 5000
  })
  //axios拦截器:请求拦截，响应拦截
  instanca.interceptors.request.use(config => {
    // console.log(config);
    // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌才有权限访问
    // config.headers.Authorization = window.sessionStorage.getItem("token");
    return config
  },err => {
    console.log(err);
  });

  //响应拦截
  instanca.interceptors.response.use(res => {
    // console.log(res);
    return res
  },err => {
    console.log(err);
  });

  return instanca(config)
}