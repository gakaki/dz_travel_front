// pages/play/play.js
const app = getApp();
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season, FinishGuide, CheckGuide, Base, Http, PlayLoop, FreshSpots, SetRouter, EventShow, ModifyRouter } from '../../api.js';
const sheet = require('../../sheets.js');
let startPoint//起点
let arr = []
let i = 0
let ii = 0
//  let pointArr = []
let cid //城市id
let scale = false
let pointIds = [] //景点id
let dian = []//每次规划路线时点击过的点
let linePointArr//路线中的点
let startTime = 0
let city = ''
const chgGold = sheet.Parameter.Get(sheet.Parameter.CHANGELINE).value
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: false,//是否开始游玩
    event: false,//是否有事件
    lineDown: false,//规划的路线是否走完
    double: false,
    chgLine: false,
    cfmStr: '',
    cfmDesc: '是否花费 100金币修改路线',
    startPoint: {
      x: 500,
      y: 300
    },
    spots: [],
    isStart: false,//是否游玩中
    taskPer: 0,//任务完成进度
    season: 'SPRING',
    licheng: 0,
    weather: '',
    isChg: false,//是否正在修改路线
    showWalk: false,
    walkPoint: [],
    gender: 1,
    shixianArr: [],
    shixian: null,//当前变化的实线数据
    dashedLine: [],//虚线数组
    testArr: [],
    scale: 2,  //超过10个景点就能缩放
    animationDatas: {},
    animation: null,
    isPop: false,
    isFirstIn: false,
    isGetPost: false,
    canPhoto: false,
    isDialogQuestion: false,
    isCongratulations: false,
    isMissionOpen: false,
    isMissionOpenDouble: false,
    isShowIntro: false,
    scrollWidth: '100vw',
    scrollHeight: '100vh',
    zoom: 1,
    points: [],
    finalPoints: [],
    lines: [],
    finalLines: [],
    passLines: [],
    finalpassLines: [],
    currentPoint: 0,
    poepleLocation: {},
    poepleLocationNum: 0,
    locations: [{
      id: 0,
      type: 'start',
      x: 23,
      y: 56,
      time: 1000,
      passedStatus: false
    }, {
      id: 1,
      type: 'jd',
      x: 154,
      y: 165,
      time: 2000,
      passedStatus: false
    }, {
      id: 2,
      type: 'jd',
      x: 354,
      y: 765,
      time: 3000,
      passedStatus: false
    }, {
      id: 3,
      type: 'end',
      x: 450,
      y: 587,
      time: 4000,
      passedStatus: false
    }]
  },
  onUnload() {
    arr = []
    dian = []
    //  Http.unlisten(PlayLoop, this.freshspots, this)
  },
  onHide: function () {
    arr = []
    dian = []
    // Http.unlisten(PlayLoop, this.freshspots, this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gender: app.globalData.userInfo.gender
    })

    let m = new CheckGuide();
    m.fetch().then(res => {
      this.setData({
        hasPlay: res.hasPlay
      })
    })

    //获取路线的最新状态
    // let spots = this.data.spots.slice()
    // let lineArr = spots.filter(o => {
    //   return o.tracked == true
    // })
    let req = new TourIndexInfo()
    req.cid = options.cid
    req.fetch().then(req => {
      this.setData({
        weather: sheet.Weather.Get(req.weather).icon,
        licheng: app.globalData.userInfo.mileage,
        // licheng: 0,
        season: app.globalData.season,
        spots: req.spots,
        startPoint: req.startPos
      })
      startTime=req.startTime
      let playState = this.data.spots.every(o => {
        return o.index == -1
      })

      if (!playState) {
        //游玩状态下开启轮询
        //  Http.listen(PlayLoop, this.freshspots, this, 60000)
      }


      let lineDown = this.data.spots.every(o => {
        return o.tracked == true
      })
      this.setData({
        isStart: !playState,
        lineDown: lineDown,
        playing: !playState
      })
      console.log(lineDown, this.data.playing)
      console.log(this.data.isStart)
      if (this.data.isStart) { //游玩过
        //this.startplay()
        let arrs = this.data.spots.slice()
        arrs.sort((x, y) => {
          return x.index - y.index
        })
        let count = 0
        for (let i = 0; i < arrs.length; i++) {
          if (arrs[i].index != -1) count++
        }
        arrs = arrs.slice(-count)//路线中的点
        arrs.forEach(o => {
          pointIds.push(o.id)
        })
        this.lineState(arrs)
      }

    })
    cid = options.cid
    city = sheet.City.Get(options.cid).city
    wx.setNavigationBarTitle({
      title: city + '游玩'
    })
    // this.scaleXy(2)
  },
  //触发事件
  touchEvt() {
    let req = new EventShow()
    req.fetch().then(req => {

    })
  },
  //刷新景点信息
  freshspots(res) {
    if (res.freshSpots) {
      let req = new FreshSpots()
      req.fetch().then(req => {
        this.setData({
          spots: req.spotss
        })
      })
    }
    if (req.newEvent) {

    }
    //更新景点状态

    if (req.spotsTracked > 0) {
      let spotss = this.data.spots.map(o => {
        if (o.index < req.spotsTracked) {
          o.tracked = true
        }
        return o
      })
      this.setData({
        spots: spotss
      })
    }
  },
  showTask() {
    this.setData({
      isMissionOpen: true
    })
  },

  //缩放点和线
  scaleXy(v) {
    let that = this
    let temptestArr = this.data.spots.map(item => {
      return Object.assign({}, item, {
        // name: item.name,
        // idx: item.idx,
        x: item.x * v,
        y: item.y * v
      })
    })
    this.setData({
      spots: temptestArr
    })
    let startPoint = Object.assign({}, {
      x: this.data.startPoint.x * v,
      y: this.data.startPoint.y * v
    })
    this.setData({
      startPoint: startPoint
    })
    if (this.data.dashedLine.length > 0) {
      let obj = this.data.dashedLine.map(item => {
        return Object.assign({}, {
          idx: item.idx,
          x: item.x * v,
          y: item.y * v,
          tx: item.tx * v,
          ty: item.ty * v,
          jiaodu: item.jiaodu,
          wid: item.wid * v,
          time: item.time,
          style: 'position:absolute;top:' + item.ty * v + 'rpx;' + 'left: ' + item.tx * v + 'rpx;width:' + item.wid * v + 'rpx;transform: rotate(' + item.jiaodu + 'deg);'
        })
      })
      this.setData({
        dashedLine: obj
      })
    }
    if (this.data.shixianArr.length > 0) {
      let obj = this.data.shixianArr.map(item => {
        return Object.assign({}, {
          idx: item.idx,
          x: item.x * v,
          y: item.y * v,
          tx: item.tx * v,
          ty: item.ty * v,
          jiaodu: item.jiaodu,
          wid: item.wid * v,
          time: item.time,
          style: 'position:absolute;top:' + item.ty * v + 'rpx;' + 'left: ' + item.tx * v + 'rpx;width:' + item.wid * v + 'rpx;transform: rotate(' + item.jiaodu + 'deg);'
        })
      })
      this.setData({
        shixianArr: obj
      })
    }
    if (!this.data.playing) {
      this.setData({
        showWalk: false
      })
      setTimeout(() => {
        that.start()
      }, 30)
    }
  },
  zoomplus() {
    if (this.data.zoom !== 2) {
      this.setData({
        scrollHeight: '200vh',
        scrollWidth: '200vw',
        zoom: 2,
        points: this.data.points
      })
      this.scaleXy(2)

    } else if (this.data.zoom) {
      wx.showToast({
        title: '地图已经最大',
        icon: 'none'
      })
      return
    }
  },
  zoomminus() {
    if (this.data.zoom !== 1) {
      this.setData({
        scrollHeight: '100vh',
        scrollWidth: '100vw',
        zoom: 1
      })
      this.scaleXy(0.5)
    } else if (this.data.zoom === 1) {
      wx.showToast({
        title: '地图已经最小',
        icon: 'none'
      })
      return
    }
  },
  chgWid(e) {

    let obj = e.detail
    let spots = this.data.spots
    if (obj.idx <= 0) return
    let spotss = spots.map(o => {
      if (obj.idx - 1 == o.index) {
        o.tracked = true
      }
      return o
    })
    if (this.data.walkPoint.length - 1 == obj.idx) {
      this.setData({
        isStart: false,
        lineDown: true
      })
    }
    //spots[obj.idx - 1].tracked = true
    this.setData({
      spots: spotss
    })

    this.setData({
      shixianArr: this.data.dashedLine.slice(0, obj.idx)
    })
    if (obj.idx == this.data.walkPoint.length) return
    let xuxianObj = this.data.walkPoint[obj.idx]
    let shixian = { x: this.data.walkPoint[obj.idx - 1].x, y: this.data.walkPoint[obj.idx - 1].y, wid: 0, jiaodu: xuxianObj.jiaodu }
    this.setData({
      shixian: shixian
    })

    //实线动画
    // setTimeout(() => {
    //   //实线的长短
    //   let animation = wx.createAnimation({
    //     duration: obj.time,
    //     timingFunction: 'linear'
    //   })
    //   // this.animation = animation
    //   animation.width(this.data.dashedLine[obj.idx - 1].wid + 'rpx').step()
    //   this.setData({
    //     animationDatas: animation.export()
    //   })
    //   console.log('animationDatas', this.data.animationDatas)
    // }, 30)

  },
  startplay(chg) {
    if (pointIds.length == 0) {
      wx.showToast({
        title: '请先规划路线',
        icon: 'none',
        mask: true
      })
      return
    }
    if (this.data.isStart && !this.data.isChg) return
    this.setData({
      showWalk: false
    })
    let req = new SetRouter()
    req.cid = cid
    req.line = pointIds
    req.fetch().then(req => {
      // startTime = req.spots[0].startime
      req.spots.splice(0, 1)
      this.setData({
        spots: req.spots,
        isChg: false,
        isStart: true,
        playing: true
      })
      startTime=req.startTime
        this.start() 
    })
  },
  start() {
    let pointArr = []
    dian = []
    this.setData({
      lineDown: false
    })
    if (this.data.dashedLine) {
      let spots = this.data.spots
      spots.sort((x, y) => {
        return x.index - y.index
      })
      linePointArr = spots.slice(-this.data.dashedLine.length)//选中的点

      pointArr[0] = { x: this.data.startPoint.x, y: this.data.startPoint.y, idx: 0, time: startTime, jiaodu: this.data.dashedLine[0].jiaodu, wid: this.data.dashedLine[0].wid }
      for (let i = 0; i < this.data.dashedLine.length; i++) {
        pointArr[i + 1] = { x: this.data.dashedLine[i].x, y: this.data.dashedLine[i].y, idx: i + 1, jiaodu: this.data.dashedLine[i].jiaodu, wid: this.data.dashedLine[i].wid, time: linePointArr[i].arriveStamp }
      }
      // pointArr[0] = { x: this.data.startPoint.x, y: this.data.startPoint.y, idx: -1, time: linePointArr[i].arriveStamp - 60000, jiaodu: this.data.dashedLine[0].jiaodu, wid: this.data.dashedLine[0].wid }
      // for (let i = 0; i < this.data.dashedLine.length; i++) {
      //   pointArr[i + 1] = { x: this.data.dashedLine[i].x, y: this.data.dashedLine[i].y, idx: i , jiaodu: this.data.dashedLine[i].jiaodu, wid: this.data.dashedLine[i].wid, time: linePointArr[i].arriveStamp }
      // }
      this.setData({
        walkPoint: []
      })
      setTimeout(() => {
        this.setData({
          walkPoint: pointArr,
          showWalk: true
        })
      }, 30)

    }
  },
  hidePop() {
    this.setData({
      chgLine: false
    })
  },
  toCfm() {
    if (app.globalData.gold > 100) this.chgLines()
    else {
      wx.navigateTo({
        url: '../recharge/recharge'
      })
      this.setData({
        chgLine: false
      })
    }
  },
  //添加或修改路线
  xiugaiLine() {
    if (!this.data.playing || this.data.lineDown) {
      this.setData({
        isChg: true
      })
      return
    }
    if (app.globalData.gold < 100) {
      this.setData({
        chgLine: true,
        cfmStr: '前往充值',
        cfmDesc: '金币不足，可前往充值'
      })
      console.log(this.data.cfmStr)
      return
    } else {
      this.setData({
        chgLine: true,
        cfmStr: '确定',
        isChg: true
      })
    }

  },
  //添加或修改路线
  chgLines() {

    let reqs = new ModifyRouter()
    // req.cid = cid
    // req.line = pointIds
    reqs.fetch().then(req => {
      // pointIds = []
      // startTime = req.spots[0].startime
      reqs.spots.splice(0, 1)
      this.setData({
        spots: req.spots,
        isChg: true,
        isStart: true,
        chgLine: false
      })
      let num = 0
      req.spots.forEach(o=>{
        if(o.index > -1) num++
      })
      let dashs = this.data.dashedLine.slice()
      dashs = dashs.slice(0, num)
      this.setData({
        dashedLine: dashs
      })
      pointIds = pointIds.slice(0,num)
      app.globalData.gold = req.goldNum
      // this.start()
    })
    return


    let curDian = this.data.spots.find(o => {
      return o.arriveStamp > Base.servertime
    })
    if (curDian) {
      let dashedLines = this.data.dashedLine.slice(0, curDian.index + 1)//取消还未走过的路线
      dashedLines.forEach(o => {
        pointIds.push(o.id)
      })
      pointIds = pointIds.slice(0, curDian.index + 1)  //更新路线
    }


    let req = new SetRouter()
    req.cid = cid
    req.line = pointIds.slice()
    req.fetch().then(req => {
      dian = []
      this.setData({
        isChg: true,
        chgLine: false
      })
      arr = []
      let dash = this.data.dashedLine.slice()
      this.setData({
        spots: req.spots,
        // showWalk: false,
        dashedLine: []
      })
      let arrs = this.data.spots.slice()
      arrs.sort((x, y) => {
        return x.index - y.index
      })
      let count = 0
      for (let i = 0; i < arrs.length; i++) {
        if (arrs[i].index != -1) count++
      }
      arrs = arrs.slice(-count)//路线中的点


      if (curDian) {
        let ab = arrs.find(o => {
          return o.id == curDian.id
        })
        let abc = arrs.slice(0, arrs.indexOf(ab) + 1)

        // this.lineState(abc) //优化
        //优化，改为只把没走过的虚线清掉就行了
        this.setData({
          dashedLine: dash.slice(0, arrs.indexOf(ab) + 1)
        })

      }
      else {
        // this.lineState(arrs) //优化

        //优化，改为只把没走过的虚线清掉就行了
        this.setData({
          dashedLine: dash.slice(0, arrs.indexOf(ab) + 1)
        })
      }
    })
  },
  //画虚线
  drawDashedLine(e) {
    let dSet = e.currentTarget.dataset
    let lastPoint, curPoint
    //如果该景点走过了，点击跳转至观光
    if (dSet.track) {
      wx.navigateTo({
        url: '../goSight/goSight?pointId=' + dSet.id + '&cid=' + cid
      })
      return
    }
    if (!this.data.isChg) {
      wx.showToast({
        title: '请先点击添加路线，才能规划路线',
        icon: 'none',
        mask: true
      })
      return
    }

   
   
    if (this.data.isStart && !this.data.isChg) return
    // if (pointIds.indexOf(dSet.id) != -1) return
    if (dian.indexOf(dSet.id) != -1) {
      wx.showToast({
        title: '路线规划不可前往相同景点',
        icon: 'none',
        mask: true
      })
      return
    }

    dian.push(dSet.id)
    curPoint = this.data.spots.find(v => {
      return v.id == dSet.id
    })
    //   let curDian = spots.find(o => {
    //     return o.arriveStamp > Base.servertime
    //   })
    //   let aa = spots.find(o => {
    //     return o.id == dSet.id
    //   })
    //    //if (aa == curDian) return
    pointIds.push(dSet.id)
    if (this.data.dashedLine.length == 0) {
      lastPoint = this.data.startPoint
    }

    else lastPoint = this.data.dashedLine[this.data.dashedLine.length - 1]

    let wid = this.drawOneLine(lastPoint.x, lastPoint.y, curPoint.x, curPoint.y)
    let jiaodu = this.calcAngleDegrees(lastPoint, curPoint)
    let line = {
      idx: this.data.dashedLine.length == 0 ? 0 : this.data.dashedLine.length,
      x: curPoint.x,
      y: curPoint.y,
      tx: lastPoint.x,
      ty: lastPoint.y,
      jiaodu: jiaodu,
      wid: wid,
      style: 'position:absolute;top:' + lastPoint.y + 'rpx;' + 'left: ' + lastPoint.x + 'rpx;width:' + wid + 'rpx;transform: rotate(' + jiaodu + 'deg);'
    }
    //arr.push(line)
    let dashs = this.data.dashedLine
    dashs.push(line)
    this.setData({
      dashedLine: dashs
    })
  },
  //进页面时游玩初始状态
  lineState(arrs) {

    let lastPoint, curPoint
    curPoint = this.data.spots.find(v => {
      return v.index == arrs[0].index
    })
    ii++
    if (arr.length == 0) {
      lastPoint = this.data.startPoint
    }
    else lastPoint = arr[arr.length - 1]

    let wid = this.drawOneLine(lastPoint.x, lastPoint.y, curPoint.x, curPoint.y)
    let jiaodu = this.calcAngleDegrees(lastPoint, curPoint)
    let line = {
      idx: this.data.dashedLine.length == 0 ? 0 : this.data.dashedLine.length,
      x: curPoint.x,
      y: curPoint.y,
      tx: lastPoint.x,
      ty: lastPoint.y,
      jiaodu: jiaodu,
      wid: wid,
      time: arrs[0].arriveStamp,
      style: 'position:absolute;top:' + lastPoint.y + 'rpx;' + 'left: ' + lastPoint.x + 'rpx;width:' + wid + 'rpx;transform: rotate(' + jiaodu + 'deg);'
    }

    arr.push(line)
    arrs.shift()
    if (arrs.length > 0) {
      this.lineState(arrs)
    }
    else {
      this.setData({
        dashedLine: arr
      })
      let num = 0  //几条实线
      for (let i = 0; i < this.data.spots.length; i++) {
        if (this.data.spots[i].tracked) num++
      }
      this.setData({
        shixianArr: this.data.dashedLine.slice(0, num)
      })
      this.start()
    }
  },
  //旋转角度
  calcAngleDegrees(a, b) {
    if (a === undefined || b === undefined) return
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
  },
  //画线段
  drawOneLine(x, y, X, Y) {  //起点，终点坐标
    let w = Math.abs(X - x)
    let h = Math.abs(Y - y)
    return Math.round(Math.hypot(w, h))
  },

  showDesc() {
    this.setData({
      isShowIntro: true
    })
  },
  hideDesc() {
    this.setData({
      isShowIntro: false
    })
  },

  strToNum(str) {
    // let reg = /[^0-9]/g
    // return parseInt(str.replace(reg, ''))
    return parseInt(str)
  },

  toPr() {
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?cid=' + cid + '&city=' + city
    })
  },
  toProps() {
    wx.navigateTo({
      url: '../props/props?cid=' + cid
    })
  },
  showisPop() {
    this.setData({
      isPop: true
    })
  },
  hideDialogQuestion() {
    this.setData({
      isDialogQuestion: false
    })
  },
  hideisPop() {
    this.setData({
      isPop: false
    })
  },
  showIntro() {
    this.setData({
      isShowIntro: true
    })
  },
  hideIntro() {
    this.setData({
      isShowIntro: false
    })
  },
  hideMissionOpen() {
    this.setData({
      isMissionOpen: false
    })
  },
  hideCongratulations() {
    this.setData({
      isCongratulations: false
    })
  },

  hideFirstIn() {
    this.setData({
      isFirstIn: false
    })
  },
  hidePost() {
    this.setData({
      isGetPost: false,
      canPhoto: true
    })
  },
  notDo() {
    return
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.play = this.selectComponent("#play");
    this.setData({
      poepleLocation: this.data.locations[0]
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
  },

  played() {
    let m = new FinishGuide();
    m.play = true
    m.fetch()
    this.setData({
      hasPlay: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})