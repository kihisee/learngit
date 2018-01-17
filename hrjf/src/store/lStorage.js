
const ls = window.sessionStorage
let Base64 = require('js-base64').Base64;
export default {
    getItem(key){
        try {
          return JSON.parse(Base64.decode(ls.getItem(key)))
        } catch (err) {
          return undefined
        }
    },
    setItem(key, val) {
        ls.setItem(key, Base64.encode(JSON.stringify(val)))
    },
    clear() {
        ls.clear()
   },
   setEndDate(addNum){ //设置过期时间
      var today,ms,thatDay, y, m, d,endDate;
      today = new Date().getTime();
      ms = today + addNum*24*60*60*1000;
      thatDay = new Date(ms);
      y = thatDay.getFullYear();
      m = thatDay.getMonth()+1;
      m < 10 ? m='0' + m : m
      d = thatDay.getDate();
      endDate = y+m+d+thatDay.getHours()+thatDay.getMinutes()+thatDay.getSeconds();
      return endDate
   },
}