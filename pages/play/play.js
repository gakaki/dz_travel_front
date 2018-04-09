// pages/play/play.js
const app = getApp();
<<<<<<< HEAD
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season } from '../../api.js';
const sheet = require('../../sheets.js');

=======
import { Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season } from '../../api.js';
const sheet = require('../../sheets.js');
>>>>>>> 1aa9d9297ebbfc065af5a1b73cdbdb64cb95ff2f
let startPoint//起点
let arr = []
let i = 0
let pointArr = []
let isStart = false  //是否开始行走
let cid //城市id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startPoint: {  //起点
      cid: 1,
      x: 200,
      y: 200,
      "isStart": true
    },

    spots: [

      {
        id: "100102",
        cid: 1,
        x: 400,
        y: 400,
        isStart: false,
        tracked: true,
        index: 2,
        no: 1,
        name: "颐和园",
        desc: "颐和园坐落于北京西郊，是中国古典园林之首，总面积约290公顷，由万寿山和昆明湖组成。全园分3个区域：以仁寿殿为中心的政治活动区；以玉澜堂、乐寿堂为主体的帝后生活区；以万寿山和昆明湖组成的风景旅游区。",
        building: [
          "2a",
          "2b"
        ]
      },
      {
        id: "100103",
        cid: 1,
        x: 600,
        y: 400,
        isStart: false,
        tracked: false,
        index: 3,
        no: 1,
        name: "天安门广场",
        desc: "在长安街南侧，北京城的传统中轴线上，座落着世界上最大的广场——天安门广场，广场中心为人民英雄纪念碑，继续向南穿过毛主席纪念堂就到了正阳门，也就是人们常说的前门。广场的西侧是人民大会堂，东侧是国家博物馆。",
        building: [
          "20a",
          "20b"
        ]
      }
    ],
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
    animationData: {},
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取路线的最新状态
    let spots = this.data.spots.slice()
    console.log(spots)
    // let lineArr = spots.filter(o => {
    //   return o.tracked == true
    // })


    //游玩过
     this.lineState(spots)

    let req = new TourIndexInfo()
    req.cid = options.cid
    req.fetch().then(req => {
      console.log(req)
      this.setData({
        weather: sheet.Weather.Get(req.weather).icon,
        licheng: req.userInfo.mileage,
        season: Season[req.season]
      })
      console.log(this.data.weather)
    })
    cid = options.cid
    // this.setData({
    //   testArr: this.getPoint()
    // })
    // console.log(this.data.testArr)
    wx.setNavigationBarTitle({
      title: '成都游玩'
    })
  },
  showTask() {
this.setData({
  isMissionOpen: true  
})
  },
  //修改路线
  chgLine() {
    this.setData({
      isChg: !this.data.isChg
    })
    console.log(this.data.isChg)
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
let spots = this.data.spots
spots[obj.idx-1].tracked = true
this.setData({
  spots: spots
})
    
    console.log(obj)
    this.setData({
      shixianArr: this.data.dashedLine.slice(0, obj.idx)
    })
    setTimeout(() => {
      if (this.data.shixianArr.length == this.data.dashedLine.length) {
        try {
          wx.removeStorageSync('clickedPoint')
          wx.removeStorageSync('isStart')
        } catch (e) {
        }
      }
    }, 30)
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

    try {
      let value = wx.getStorageSync('isStart')
      if (value) {
        isStart = true
        return
      }
      else {
        try {
          wx.setStorageSync('isStart', true)
        } catch (e) {
        }
      }
    } catch (e) {
      console.log('err')
    }


    if (this.data.dashedLine) {
      pointArr[0] = { x: this.data.startPoint.x, y: this.data.startPoint.y, idx: 0, time: 1000, jiaodu: this.data.dashedLine[0].jiaodu, wid: this.data.dashedLine[0].wid }
      for (let i = 0; i < this.data.dashedLine.length; i++) {
        pointArr[i + 1] = { x: this.data.dashedLine[i].x, y: this.data.dashedLine[i].y, idx: i + 1, jiaodu: this.data.dashedLine[i].jiaodu, wid: this.data.dashedLine[i].wid, time: 40000 * (i + 1) }
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
    let dSet = e.currentTarget.dataset

    let lastPoint, curPoint
    let idx = dSet.idx
    if (idx == 1) return   //点击起点
    //如果该景点走过了，点击跳转至观光
    if (dSet.track) {
      wx.navigateTo({
        url: '../goSight/goSight?pointId=' + dSet.id
      })
      return
    }


    let pArr = [idx]

    //是否开始游玩
    try {
      let value = wx.getStorageSync('isStart')
      if (value) {
        if (this.data.isChg) {

        } else return
      }

    } catch (e) {
      console.log('err')
    }
    //游玩还未结束点击过的点
    try {
      let value = wx.getStorageSync('clickedPoint')
      if (value) {
        if (value.includes(idx)) {
          return
        }
        else {
          try {
            wx.setStorageSync('clickedPoint', value.concat(idx))
          } catch (e) {
          }
        }

      } else {
        try {
          wx.setStorageSync('clickedPoint', pArr)
        } catch (e) {
        }
      }
    } catch (e) {
      console.log('err')
    }



    curPoint = this.data.spots.find(v => {
      return v.index == idx
    })
    i++
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
      time: 5000 * i,
      style: 'position:absolute;top:' + lastPoint.y + 'rpx;' + 'left: ' + lastPoint.x + 'rpx;width:' + wid + 'rpx;transform: rotate(' + jiaodu + 'deg);'
    }

    arr.push(line)

    this.setData({
      dashedLine: arr
    })
    console.log(this.data.dashedLine)
  },
  //进页面时游玩初始状态
  lineState(arrs) {
    console.log(arrs)
    let lastPoint, curPoint
    curPoint = this.data.spots.find(v => {
      return v.index == arrs[0].index
    })
    i++
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
      time: 5000 * i,
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
      this.startplay()
      console.log(this.data.dashedLine)
      console.log(this.data.shixianArr)
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
    console.log('startPoint', startPoint)
    console.log('finalratio', finalratio)
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
      url: '../props/props?cid='+cid
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})