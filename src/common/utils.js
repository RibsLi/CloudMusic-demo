// 格式化日期
export function formatDate(date, fmt) {
  // 1.获取年份
  // Y+ 正则表达式规则
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 2.M+ 正则表达式规则
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 防抖函数
export function debounce (func, delay = 50) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 格式化播放时间
export function formatDuration (duration) {
  // 分钟：向下取整，转为字符，不足两位前边补零
  const minute = Math.floor(duration / 1000 / 60)
    .toString()
    .padStart(2, '0')
  const second = Math.floor(duration % 60)
    .toString()
    .padStart(2, '0')
  return minute + ':' + second
}