//const sheet = require('../sheets.js');
import { ShareInfo } from '../api.js'
import { shares } from '../sheets.js'
let app = getApp()
//dateType输出时间格式类型
//1. 2018/03/09 
//2. 2月1日 
const formatTime = (date, dateType) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (dateType == 1) {
    return [year, month, day].map(formatNumber).join('/')
  }
  else if (dateType == 2) {
    return month + '月' + day + '日'
  }

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}



const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//替换源字符串中的partens为fills里的值，
// partens可以传字符串、数组、或正则表达式
// fills如果包含多个参数，则分两种处理方式：
// 第一种：当partens为正则表达式或字符串时
// 每次匹配到parten时从fills里依次并循环取值；
// eg: tplStr('affaafff','a', 1,2) 输出=> '1ff21fff'
//
//
// 第二种：当partens为数组时，每次匹配到数组里的元素后，取该元素在数组中的索引，使用fills里同索引位置的值进行替换
// eg: tplStr('affabfff',['a','b'], 1,2) 输出=> '1ff12fff'
function tplStr(source, partens, ...fills) {

  //如果是html格式，则顺便替换一下\n为<br/>
  let regHtml = /\<.[^<>]*\>/
  if (regHtml.test(source)) {
    source = source.replace('/\\n/g', '<br/>')
  }

  if (!fills.length) {
    return source
  }

  let parten;
  let forArr = false;
  if (typeof partens == 'string') {
    parten = new RegExp(partens, 'g')
  }
  else if (partens.constructor == Array) {
    //当作数组处理
    parten = new RegExp('(' + partens.join('|') + ')', 'g');
    forArr = true;
  }
  else {
    //认为传进来的是正则表达式
    parten = partens
  }

  let idx = 0
  let maxIdx = fills.length - 1
  return source.replace(parten, function (str, id) {
    if (forArr) {
      idx = partens.indexOf(str)
      return fills[idx]
    }
    else {
      if (idx > maxIdx) {
        idx = 0
      }
      return fills[idx++]
    }
  })
}


function care(obj, key, cb) {
  if (obj.__pKeys && obj.__pKeys.has(key)) {
    obj.__pKeys.get(key).add(cb);
  }
  else {
    obj.__pKeys = obj.__pKeys || new Map();
    if (!obj.__pKeys.has(key)) {
      obj.__pKeys.set(key, new Set());
    }
    obj.__pKeys.get(key).add(cb);

    let d = Object.getOwnPropertyDescriptor(obj, key)

    d.ctx = d.ctx || obj;

    // let oget,oset;
    d._funGet = () => {
      if (d._oget) {
        return d._oget();
      }
      else {
        return d.value;
      }
    };

    d._funSet = (v) => {
      if (d._oset) {
        d._oset(v);
      }
      else {
        d.value = v;
      }
      d.ctx.__pKeys.get(key).forEach(c => {
        c(v);
      })
    };

    if (d.set || d.get) {
      //already has descriptor get or set
      d._oset = d.set;
      d._oget = d.get;
      d.get = d._funGet;
      d.set = d._funSet;
      if (!d.configurable) {
        console.error('cannot proxy a unConfigurable key')
        return;
      }
      Object.defineProperty(obj, key, d)
    }
    else {
      //need define
      d = {
        get: d._funGet,
        set: d._funSet,
        ctx: obj
      };
      Object.defineProperty(obj, key, d);
    }

  }


}

//向下取整并保留两位小数；
function fixedNum(num) {
  //此处不用四舍五入为了防止钱会多出的情况
  let str = Math.floor(num * 100) / 100;
  let v = str.toString().split(".");
  if (v[1] == undefined) {
    str = v[0] + '.00'
  }
  else if (v[1].length == 1) {
    str = str + '0'
  }
  return str
}

class Timeline {
  constructor(delay, cb, ctx, autoStart = false) {
    this.delay = delay;
    this.cb = cb;
    this.ctx = ctx;
    this.preve = null;
    this.next = null;
    this.started = false;
    this.finished = false;

    autoStart && this.start();

  }

  get root() {
    let _root = this;
    while (_root.preve) {
      _root = _root.preve;
    }
    return _root;
  }

  get last() {
    let _last = this;
    while (_last.next) {
      _last = _last.next;
    }
    return _last;
  }

  start() {
    let startNode = this;

    while (startNode.preve && !startNode.preve.started) {
      startNode = startNode.preve;
    }

    if (startNode != this) {
      startNode.start();
    }
    else {
      this.tmr = setTimeout(() => { this.finishCall() }, this.delay);
      this.started = true;
    }

    return this;
  }

  finishCall(callFinishCb = true, startNext = true) {
    if (this.tmr) {
      clearTimeout(this.tmr);
      this.tmr = null;
    }
    if (!this.finished && callFinishCb) {
      this.ctx ? this.cb.call(this.ctx) : this.cb();
    }

    this.finished = true;

    //chain
    if (this.next && this.next instanceof Timeline) {
      if (startNext)
        this.next.start();
    }
  }


  add(time, cb, ctx) {
    let tm = Timeline.add(time, cb, ctx);
    tm.preve = this;
    this.next = tm;
    return tm;
  }

  stop() {
    if (this.tmr) {
      //self not finished
      this.finishCall(false, false);

    }
    else {
      //self finished, find next 
      if (this.next && this.next instanceof Timeline) {
        this.next.stop();
      }
    }
    return this;
  }

  static add(time, cb, ctx) {
    return new Timeline(time, cb, ctx);
  }

  /**
  * @param tm 要停止的timeline,
  * 注意：stop不会调用timeline链路上尚未完成结点的回调函数！！
  */
  static stop(tm) {
    tm.root.stop();
  }

  /**
  * @param tm 要停止的timeline
  * 注意：finish会调用一次timeline链的最后一个结点上的回调函数（如果它已经被调用过，则不再重复调用）!!
  */
  static finish(tm) {
    this.stop(tm);
    tm.last.finishCall(true, false);
  }
}
function getRankFrame(season) {
  let idx = 0
  for (let i in season) {
    idx++
  }
  if (idx == 1) {
    return ''
  }
  if (idx > 1) {
    let i = idx - 1
    if (parseInt(season[i].rank) <= 6) {
      return ''
    } else return sheet.Stage.Get(season[i].rank).frame
  }
}
function getPersonFrame(rank) {
  if (parseInt(rank) <= 6) {
    return ''
  } else return sheet.Stage.Get(parseInt(rank)).frame
}
function spliceStr(v, n) {
  if (v.length >= n) {
    let arr = v.split('')
    arr.length = n - 1
    arr.push('...')
    v = arr.join('')
  }
  return v
}

//获取用户信息
function getUserInfo(app, _that) {
  if (app.globalData.userInfo) {
    _that.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  } else if (_that.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况

    app.userInfoReadyCallback = res => {
      _that.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }

  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        _that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
}

const NUM_W = 9999
const NUM_TEN_K = 9999999 //
const NUM_HUN_M = 100000000//亿
//limit  是否增加万级别的中文  true是万字转换
function formatNum(num, limit) {
  if (limit && num > NUM_W && num <= NUM_TEN_K) {
    let str = num / (NUM_W + 1)
    let arr = (str + '').split('.')
    if (arr.length < 2) {
      return str + '万'
    }
    return arr[0] + '.' + arr[1].substr(0, 1) + '万'
  }
  if (num <= NUM_TEN_K) {
    return num
  }
  else if (num < NUM_HUN_M) {
    //不使用toFixed，因为它会四舍五入，临近界值时误差太多
    let str = num / (NUM_TEN_K + 1)
    let arr = (str + '').split('.')
    if (arr.length < 2) {
      return str + '千万'
    }
    return arr[0] + '.' + arr[1].substr(0, 1) + '千万'
  }
  else {
    let str = num / NUM_HUN_M
    let arr = (str + '').split('.')
    if (arr.length < 2) {
      return str + '亿'
    }
    return arr[0] + '.' + arr[1].substr(0, 1) + '亿'
  }
}

function shareTitle(type, par) {
  let titles = shares.filter(v => {
    return v.type == type
  })
  let title = titles[parseInt(Math.random() * titles.length)].title;
  if (par) {
    title = title.replace('%s', par)
  }
  return title
}


//innerObj内部需要用到的变量
//toShare分享链接上需要附带的变量
function shareToIndex(that, innerObj, toShareLink) {
  var innerObj = innerObj ? innerObj : {}
  if (!innerObj.type) innerObj.type = 1
  var toShareLink = toShareLink ? toShareLink : {}
  let nowPath = '/pages/index/index';
  let uid = app.globalData.userInfo.uid
  if (!uid) {
    uid = wx.getStorageSync('uid')
  }
  nowPath += '?shareUid=' + uid
  for (let k in toShareLink) {
    nowPath += '&' + k + '=' + toShareLink[k]
  }
  let url = innerObj.type
  if (url == 4 || url == 6) { url = 1 }
  let imageUrl = 'https://gengxin.odao.com/update/h5/travel/share/' + url + '.png'

  if (app.globalData.debug.share){
  }
  return {
    title: shareTitle(innerObj.type, innerObj.replaceContent),
    path: nowPath,
    imageUrl: imageUrl,
    success: function () {
      let m = new ShareInfo();
      m.fetch()
      innerObj.suc && innerObj.suc(that)
    }
  }
}

//秒转换成 天.小时.分钟'
function secToTimeStr(sec, prefix = '') {
  sec = sec >> 0;
  let str = ''
  if (sec == 0) {
    return prefix + str
  }
  else if (sec < 60) {
    str = sec + '秒'
  }
  else if (sec < 3600) {
    str = Math.floor(sec / 60) + '分钟'
  }
  else if (sec < 86400) {
    let h = Math.floor(sec / 3600)
    let m = sec % 3600
    str = h + '小时' + (m == 0 ? '' : Math.floor(m / 60) + '分钟')
  }
  else {
    let d = Math.floor(sec / 86400)
    let left = sec % 86400
    str = d + '天' + secToTimeStr(left)
  }

  return prefix + str
}

//秒转换成天.时.分钟, 不足一分钟的显示1分钟
function secToDHM(sec) {
  sec = sec >> 0;
  let str = ''
  if (sec <= 60) {
    str = '1分钟'
  }
  else if (sec < 3600) {
    str = Math.floor(sec / 60) + '分钟'
  }
  else if (sec < 86400) {
    let h = Math.floor(sec / 3600)
    let m = sec % 3600
    str = h + '小时' + (m == 0 ? '' : Math.floor(m / 60) + '分钟')
  }
  else {
    let d = Math.floor(sec / 86400)
    let left = sec % 86400
    str = d + '天' + secToTimeStr(left)
  }

  return str
}




function redGold(v) {
  app.globalData.gold = app.globalData.gold - v
}
function addGold(v) {
  app.globalData.gold = app.globalData.gold + v
}

module.exports = {
  getRankFrame,
  formatTime,
  care,
  fixedNum,
  Timeline,
  getPersonFrame,
  spliceStr,
  getUserInfo,
  formatNum,
  shareToIndex,
  secToTimeStr,
    secToDHM,
  redGold,
  addGold,
  tplStr
}
