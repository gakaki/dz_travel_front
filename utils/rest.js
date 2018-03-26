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
    apis.Base.Ws.init(wss)
    suc(true);
  }).catch(()=> {
    suc(false);
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

module.exports = {
  start,
  showErr,
  initWs,
  wsSend,
  wsReceive,
  wsClose
}