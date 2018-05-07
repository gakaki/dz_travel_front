const apis = require('../api.js');
const APPNAME = 'travel';


// const srv = "https://tt.ddz2018.com/";
// const wss = "wss://tt.ddz2018.com/travel";
const srv = "https://local.ddz2018.com/";
const wss = "wss://local.ddz2018.com/travel";
// const srv = "https://localhost/";
// const wss = "wss://localhost/travel";
// const srv = "https://travel.ddz20listen18.com/";
// const wss = "wss://travel.ddz2018.com/travel";



const showErr = msg => {
  wx.showToast({
    title: '哎呀,' + JSON.stringify(msg),
  })
}

//启动（会默认走一遍登录流程）
const start = (suc, shareUid) => {
  apis.Base.Start(APPNAME ,srv, shareUid).then(res => {

    //console.log(res,'start')

    //初始化http轮询
    initHttpLoop();
    suc(true);
    //测试websocket,实际上应该在业务层写ws相关逻辑
    // testWs();
  }).catch(()=> {
    // suc(false);  
  })
}


const initWs = () => {
  return apis.Ws.init(wss);
}

const initHttpLoop = () => {
  apis.Http.init();
}

const wsSend = (apiModel) => {
  apis.Ws.send(apiModel);
}

const wsListen = (apiCls, cb, ctx) => {
  apis.Ws.listen(apiCls, cb, ctx);
}

const wsUnlisten = (apiCls, cb, ctx) => {
  apis.Ws.unlisten(apiCls, cb, ctx);
}

function wsClose() {
  apis.Ws.close();
}

function testWs() {
  initWs().then(()=>{
    //send
    let test = new apis.TestSend();
    test.test = 'test send websocket';


    //receive
    wsListen(apis.SysMessage, res=>{
    })
    wsSend(test);
  })
  
}


function getMd() {
  let date1 = new Date().toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
}
function ymd(v) {
  let date = new Date(apis.Base.servertime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minu = date.getMinutes();
  let second = date.getSeconds();
  //判断是否满10
  let arr = [month, day, hours, minu, second];
  //返回  3月1日
  if (v == 'cn') return arr[0] + '月' + arr[1] + '日'
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
  wsListen,
  wsUnlisten,
  wsClose,
  ymd
}