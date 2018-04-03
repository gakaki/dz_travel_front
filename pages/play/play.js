// pages/play/play.js
let startPoint//起点
let arr = []
let i = 0
let pointArr = []
let isStart = false  //是否开始行走
import {
  Timeline
} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWalk: false,
    walkPoint: [],
    gender: 1,
    shixianArr: [],
    shixian: {},//当前变化的实线数据
    dashedLine: [],//虚线数组
    testArr: [],
    scale: 2,  //超过10个景点就能缩放
    animationData: {},
    animation: null,
    isPop: false,
    isFirstIn: false,
    isGetPost: false,
    canPhoto: false,
    isDialogQuestion: true,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      testArr: this.getPoint()
    })
    console.log(this.data.testArr)
    wx.setNavigationBarTitle({
      title: '成都游玩'
    })
  },
  //缩放点和线
  scaleXy(v) {
    let that = this
    startPoint =  Object.assign({}, {
      name: startPoint.name,
      idx: startPoint.idx,
      x: startPoint.x * v,
      y: startPoint.y * v
      })
    let temptestArr = this.data.testArr.map(item => {
      return Object.assign({}, {
        name: item.name,
        idx: item.idx,
        x: item.x * v,
        y: item.y * v
      })
    })
    this.setData({
      testArr: temptestArr
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
    if (isStart) {
      this.setData({
        showWalk: false
      })
      setTimeout(() => {
        that.startplay()
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

    this.setData({
      shixianArr: this.data.dashedLine.slice(0, obj.idx - 1)
    })
    if (obj.idx == this.data.walkPoint.length) return
    let xuxianObj = this.data.walkPoint[obj.idx]
    let shixian = { x: this.data.walkPoint[obj.idx - 1].x, y: this.data.walkPoint[obj.idx - 1].y, wid: 0, jiaodu: xuxianObj.jiaodu }
    this.setData({
      shixian: shixian
    })
    setTimeout(() => {
      //实线的长短
      let animation = wx.createAnimation({
        duration: obj.time,
        timingFunction: 'linear'
      })
      // this.animation = animation
      animation.width(this.data.dashedLine[obj.idx - 1].wid + 'rpx').step()
      this.setData({
        animationData: animation.export()
      })
      console.log('animationData', this.data.animationData)
    }, 30)

  },
  startplay() {
    isStart = true
    if (this.data.dashedLine) {
      pointArr[0] = { x: startPoint.x, y: startPoint.y, idx: 0, time: 2000, jiaodu: this.data.dashedLine[0].jiaodu, wid: this.data.dashedLine[0].wid }
      for (let i = 0; i < this.data.dashedLine.length; i++) {
        pointArr[i + 1] = { x: this.data.dashedLine[i].x, y: this.data.dashedLine[i].y, idx: i + 1, jiaodu: this.data.dashedLine[i].jiaodu, wid: this.data.dashedLine[i].wid, time: 5000 * (i + 1) }
      }
      this.setData({
        walkPoint: pointArr,
        showWalk: true
      })
    }
  },
  //画虚线
  drawDashedLine(e) {
    console.log(e)
    let lastPoint, curPoint
    let idx = e.currentTarget.dataset.idx
    if (idx == 1) return   //点击起点
    curPoint = this.data.testArr.find(v => {
      return v.idx == idx
    })
    i++
    if (this.data.dashedLine.length == 0) {
      lastPoint = startPoint
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
      time: 5000 * i,
      style: 'position:absolute;top:' + lastPoint.y + 'rpx;' + 'left: ' + lastPoint.x + 'rpx;width:' + wid + 'rpx;transform: rotate(' + jiaodu + 'deg);'
    }

    arr.push(line)
    console.log(arr)
    this.setData({
      dashedLine: arr
    })

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
    },
    {
      name: 'd',
      id: 4,
      x: 116.417115,
      y: 39.886376
    },
    {
      name: 'e',
      id: 5,
      x: 116.314154,
      y: 40.01651
    },
    {
      name: 'easd',
      id: 6,
      x: 116.395486,
      y: 39.932913
    },

    {
      name: 'f',
      id: 7,
      x: 116.016033,
      y: 40.364233
    },
    {
      name: 'g',
      id: 8,
      x: 116.409512,
      y: 39.93986
    },
    {
      name: 'aa',
      id: 11,
      x: 116.400512,
      y: 39.95986
    },
    {
      name: 'h',
      id: 9,
      x: 116.391656,
      y: 39.948203
    },
    {
      name: 'i',
      id: 10,
      x: 116.402359,
      y: 39.999763
    }
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
    console.log('startPoint', startPoint)
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
      url: '../pointRaiders/pointRaiders'
    })
  },
  toProps() {
    wx.navigateTo({
      url: '../props/props'
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})