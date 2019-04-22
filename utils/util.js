//格式化日期时间
const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
//格式化日期
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
};
//格式化数字
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};

//格式化时间
const formatTime = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [hour, minute].map(formatNumber).join(':')
};

const formatHour = date =>{
  const hour = date.getHours();
  return hour;
};


//定义模块
module.exports = {
  formatDateTime: formatDateTime,
  formatDate:formatDate,
  formatTime:formatTime,
  formatHour: formatHour
}
