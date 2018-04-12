// pages/play/play.js
const app = getApp();
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season, FinishGuide, CheckGuide, Base } from '../../api.js';
const sheet = require('../../sheets.js');
let startPoint//起点
let arr = []
let i = 0
let ii = 0
//  let pointArr = []
// let isStart = false  //是否游玩中
let cid //城市id
let scale = false
let pointIds = [] //景点id
let dian = []//规划路线时点击过的点
let linePointArr//路线中的点
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
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
      console.log(req.spots)
      this.setData({
        weather: sheet.Weather.Get(req.weather).icon,
        licheng: app.globalData.userInfo.mileage,
        season: app.globalData.season,
        spots: req.spots
      })
      let playing = this.data.spots.every(o => {
        return o.index == -1
      })
      
      this.setData({
        isStart: !playing
      })
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
        this.lineState(arrs)
      }

    })
    cid = options.cid
    // this.setData({
    //   testArr: this.getPoint()
    // })
    wx.setNavigationBarTitle({
      title: '成都游玩'
    })
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
    // if (this.data.walkPoint.length > 0) {
    //   let obj = this.data.walkPoint.map(item => {
    //     return Object.assign({}, {
    //       x: item.x * v,
    //       y: item.y * v,
    //       idx: item.idx,
    //       time: item.time,
    //       jiaodu: item.jiaodu,
    //       wid: item.wid * v
    //     })
    //   })
    //   this.setData({
    //     walkPoint: obj
    //   })
    //   setTimeout(()=>{
    //     this.setData({
    //       showWalk: true
    //     }) 
    //   },1000)
    // }
    scale = true
    if (this.data.isStart) {
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
    console.log('idx', obj.idx)
    let spots = this.data.spots
    if (obj.idx  <= 0) return
    let spotss = spots.map(o => {
      if (obj.idx -1 == o.index) o.tracked = true
      this.setData({
        isStart: false
      })
      return o
    })
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
   
    console.log(pointIds)
    if (this.data.isStart && !this.data.isChg) return
    this.setData({
      showWalk: false
    })
    let req = new Base();
    req.action = 'tour.tourstart';
    req.reqFields = ['cid', 'line'];
    req.cid = cid;
    req.line = pointIds;
    req.fetch().then(req => {
      
      this.setData({
        spots: req.spots,
        isChg: false,
        isStart: true
      })
      console.log(this.data.isStart)
      if (chg) {
        this.setData({
          isChg: true
        })
      }
      this.start()
    })
  },
  start() {
    let pointArr = []
    dian = []
    if (this.data.dashedLine) {
      let spots = this.data.spots
      spots.sort((x, y) => {
        return x.index - y.index
      })
      linePointArr = spots.slice(-this.data.dashedLine.length)//选中的点

      pointArr[0] = { x: this.data.startPoint.x, y: this.data.startPoint.y, idx: 0, time: linePointArr[i].createDate - 60000, jiaodu: this.data.dashedLine[0].jiaodu, wid: this.data.dashedLine[0].wid }
      for (let i = 0; i < this.data.dashedLine.length; i++) {
        pointArr[i + 1] = { x: this.data.dashedLine[i].x, y: this.data.dashedLine[i].y, idx: i + 1, jiaodu: this.data.dashedLine[i].jiaodu, wid: this.data.dashedLine[i].wid, time: linePointArr[i].createDate }
      }
      this.setData({
        walkPoint: []
      })
      setTimeout(() => {
        this.setData({
          walkPoint: pointArr,
          showWalk: true
        })
        console.log(this.data.walkPoint)
      }, 30)

    }
  },
  //修改路线
  chgLine() {
    // pointArr = []
    //pointIds = []



    // dian = []
    // this.setData({
    //   isChg: true
    // })
    // let curDian = this.data.spots.find(o => {
    //   return o.createDate > Base.servertime
    // })
    // if (curDian) {
    //   let dashedLines = this.data.dashedLine.slice(0, curDian.index + 1)//取消还未走过的路线
     
    //   pointIds = pointIds.slice(0, curDian.index + 1)  //更新路线
    // }
    // this.setData({
    //   dashedLine: []
    // })



    // setTimeout(() => {
    //   this.setData({
    //     dashedLine: dashedLines
    //   })
    // }, 30)
    // this.startplay(true)

    let req = new Base();
    req.action = 'tour.changerouter';
    req.reqFields = ['line'];
    // req.cid = cid;
    req.line = pointIds.slice();
    req.fetch().then(req => {



      dian = []
      this.setData({
        isChg: true
      })
      let curDian = this.data.spots.find(o => {
        return o.createDate > Base.servertime
      })
      if (curDian) {
        let dashedLines = this.data.dashedLine.slice(0, curDian.index + 1)//取消还未走过的路线

        pointIds = pointIds.slice(0, curDian.index + 1)  //更新路线
      }
      this.setData({
        dashedLine: []
      })


      arr = []
      this.setData({
        spots: req.spots,
        showWalk: false,
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
      this.lineState(arrs)
    })

  },
  //画虚线
  drawDashedLine(e) {
    if (this.data.isStart && !this.data.isChg) return
    let dSet = e.currentTarget.dataset
    let lastPoint, curPoint
    //如果该景点走过了，点击跳转至观光
    if (dSet.track) {
      wx.navigateTo({
        url: '../goSight/goSight?pointId=' + dSet.id
      })
      return
    }
    // if (pointIds.indexOf(dSet.id) != -1) return
    if (dian.indexOf(dSet.id) != -1) return
    pointIds.push(dSet.id)
    dian.push(dSet.id)
    curPoint = this.data.spots.find(v => {
      return v.id == dSet.id
    })

    //let pArr = [idx]
    if (this.data.isStart && this.data.isChg) {
      arr = []
      let dashedLines = this.data.dashedLine.slice()

      let spots = this.data.spots.slice()
      let curDian = spots.find(o => {
        return o.createDate > Base.servertime
      })
      let aa = spots.find(o => {
        return o.id == dSet.id
      })
      if (aa == curDian) return


      let cur = dashedLines.find(o => {
        return o.x == curPoint.x
      })
      let i = dashedLines.indexOf(cur)
      if (cur) {
        dashedLines = dashedLines.slice(0, i + 1)//取消还未走过的路线
        this.setData({
          dashedLine: []
        })
        setTimeout(() => {
          this.setData({
            dashedLine: dashedLines
          })
        }, 30)
      } else {
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
        arr = this.data.dashedLine
        arr.push(line)
        this.setData({
          dashedLine: arr
        })
      }

      return
    }
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
    arr.push(line)
    this.setData({
      dashedLine: arr
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
      time: arrs[0].createDate,
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
  getPoint() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function flatten(arr) {
      return arr.reduce(function (prev, item) {
        return prev.concat(Array.isArray(item) ? flatten(item) : item);
      }, []);
    }

    const getDistace = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)

    let points = [{
      name: 'A',
      id: 1,
      x: 116.403414,
      y: 39.924091
    },
    {
      name: 'b',
      id: 2,
      x: 116.274853,
      y: 39.998547
    },
    {
      name: 'c',
      id: 3,
      x: 116.404081,
      y: 39.910098
    }
      // {
      //   name: 'd',
      //   id: 4,
      //   x: 116.417115,
      //   y: 39.886376
      // },
      // {
      //   name: 'e',
      //   id: 5,
      //   x: 116.314154,
      //   y: 40.01651
      // },
      // {
      //   name: 'easd',
      //   id: 6,
      //   x: 116.395486,
      //   y: 39.932913
      // },

      // {
      //   name: 'f',
      //   id: 7,
      //   x: 116.016033,
      //   y: 40.364233
      // },
      // {
      //   name: 'g',
      //   id: 8,
      //   x: 116.409512,
      //   y: 39.93986
      // },
      // {
      //   name: 'aa',
      //   id: 11,
      //   x: 116.400512,
      //   y: 39.95986
      // },
      // {
      //   name: 'h',
      //   id: 9,
      //   x: 116.391656,
      //   y: 39.948203
      // },
      // {
      //   name: 'i',
      //   id: 10,
      //   x: 116.402359,
      //   y: 39.999763
      // }
    ]

    let arrx = [1, 3, 5, 7, 9]
    let arry = [1, 3, 5, 7, 9, 11, 13]

    let res = []
    for (let i = 0; i < arrx.length; i++) {
      res[i] = []
      for (let j = 0; j < arry.length; j++) {
        res[i][j] = {}
        res[i][j]['x'] = arrx[i]
        res[i][j]['y'] = arry[j]
      }
    }
    res = flatten(res)
    let finalRes = []
    for (let i = 0; i < points.length; i++) {
      let len = res.length
      finalRes.push(res.splice(parseInt(getRandomArbitrary(0, len)), 1)[0])
      len--
    }

    let pointsDistance = points.map(item => {
      return Object.assign({}, item, {
        distance: getDistace({
          x: 0,
          y: 0
        }, item)
      })
    })
    let finalResDistance = finalRes.map((item, i) => {
      return Object.assign({}, item, {
        id: i + 1,
        distance: getDistace({
          x: 0,
          y: 0
        }, item)
      })
    })

    finalResDistance.sort((a, b) => b.distance - a.distance)
    pointsDistance.sort((a, b) => b.distance - a.distance)

    let finalratio = finalResDistance.map((item, i) => {
      return Object.assign({}, {
        x: item.x * 60,
        y: item.y * 80,
        name: pointsDistance[i].name,
        idx: pointsDistance[i].id
      })
    })


    startPoint = finalratio.find(v => {
      return v.idx == 1
    })
    return finalratio
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
      url: '../pointRaiders/pointRaiders?cid=' + cid
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
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this, 1)
  }
})