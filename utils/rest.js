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
    // initWs(); 
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

function getMd() {
  let date1 = new Date().toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
  console.log(date1)
}



module.exports = {
  start,
  showErr,
  initWs,
  wsSend,
  wsReceive,
  wsClose
}