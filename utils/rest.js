const apis = require('../api.js');
const APPNAME = 'travel';

// const srv = "https://h5t.ddz2018.com/";
// const wss = "wss://h5t.ddz2018.com/travel";
const srv = "https://local.ddz2018.com/";
const wss = "wss://local.ddz2018.com/travel";


const showErr = msg => {
  wx.showToast({
    title: '哎呀,' + JSON.stringify(msg),
  })
}

//启动（会默认走一遍登录流程）
const start = suc => {
  apis.Base.Start(APPNAME ,srv).then(res => {
    console.log(res)
    suc(true);
    initWs(); 
  }).catch(()=> {
    // suc(false);
  })
}

const initWs = () => {
  apis.Base.InitWs(wss);
}

const wsSend = (action, data) => {
  apis.Base.WsSend(action, data);
}

const wsReceive = (action, suc) => {
  apis.Base.WsReceive(action, suc);
}

function wsClose(...actions) {
  apis.Base.WsClose.apply(api.Base, actions);
}

  //let serverTime = new apis.Base()._timestamp
let serverTime = new Date().getTime() - 10
let aa = new Date().getTime()
let cha = serverTime - aa
function getMd() {
  let date1 = new Date().toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
  console.log(date1)
}
function ymd(v) {
  // let serverTime = new Date().getTime() +cha
  console.log(apis.Base.servertime)
  // let date = new Date(serverTime);
   let date = new Date(apis.Base.servertime*1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minu = date.getMinutes();
  let second = date.getSeconds();
  //判断是否满10
  let arr = [month, day, hours, minu, second];
  //返回  3月1日
  if (v == 'cn') return arr[0] + '月' + arr[1]+'号'
  arr = arr.map(item => {
   return item < 10 ? "0" + item : item;
  })
  //返回 yyyy-mm-dd hh:mm:ss
  if (v == 'all') return year + '-' + arr[0] + '-' + arr[1] + ' ' + arr[2] + ':' + arr[3] + ':' + arr[4]
  //返回  hh:mm:ss
  if (v == 'hms') return arr[2] + ':' + arr[3] + ':' + arr[4]
  //返回  yyyy-mm-dd
  else return year + '-' + arr[0] + '-' + arr[1]
}


module.exports = {
  start,
  showErr,
  initWs,
  wsSend,
  wsReceive,
  wsClose,
  ymd
}