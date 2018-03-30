// pages/play/play.js
let timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 1,
    test: true,
    walkInfo: { x: 354, y: 765, tX: 450, tY: 587, time: 5000},
    walkInfoArr: [{ idx: 0, x: 0, y: 0, time: 5000 }, { idx: 1, x: 300, y: 300, time: 8000 }, { idx: 2, x: 354, y: 765, time: 12000 }],
    isPop: false,
    isFirstIn: false,
    isGetPost: false,
    canPhoto: false,
    isCongratulations: false,
    isMissionOpen: false,
    isShowIntro: false,
    scrollWidth: '100vw',
    scrollHeight: '100vh',
    zoom: 1,
    points: [],
    finalPoints: [],
    lines: [],
    finalLines: [],
    currentPoint: 0,
    locations: [{
      type: 'start',
      x: 23,
      y: 56
    }, {
      type: 'jd',
      x: 154,
      y: 165
    }, {
      type: 'jd',
      x: 354,
      y: 765
    }, {
      type: 'end',
      x: 450,
      y: 587
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '成都游玩'
    })
  },
 
  onShow: function () {
  // setTimeout(()=>{
  //   this.setData({
  //    test: true
  //   })
  // },2000)
  },
  toGoSight() {
wx.navigateTo({
  url: '../goSight/goSight'
})
  },
  zoomplus() {
    if (this.data.zoom !== 2) {
      this.setData({
        scrollHeight: '200vh',
        scrollWidth: '200vw',
        zoom: 2,
        points: this.data.points
      })
      this.zoomPAndL(2)
      this.draw()
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
      this.zoomPAndL(0.5)
      this.draw()
    } else if (this.data.zoom === 1) {
      wx.showToast({
        title: '地图已经最小',
        icon: 'none'
      })
      return
    }
  },
  // 划线的方法集
  dottedLineReg(str, multiple) {
    let reg = /([0-9])/g
    str.replace(reg, '$1')
    return str.replace(reg, RegExp.$1 * multiple)
  },
  objTostring(obj) {
    let str = ''
    for (let item in obj) {
      str += `${item}: ${obj[item]};`
    }
    return str
  },
  calcAngleDegrees(a, b) {
    if (a === undefined || b === undefined) return
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
  },
  getMiddlePoint(a, b) {
    if (a === undefined || b === undefined) return
    return ({
      x: Math.abs((a.x + b.x) / 2),
      y: Math.abs((a.y + b.y) / 2)
    })
  },
  getDistace(a, b) {
    if (a === undefined || b === undefined) return
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
  },
  getHeorizonWidth(a, b) {
    if (a === undefined || b === undefined) return
    return Math.abs(b.x - a.x)
  },
  strToNum(str) {
    // let reg = /[^0-9]/g
    // return parseInt(str.replace(reg, ''))
    return parseInt(str)
  },
  repScale(str, muntiple) {
    return str.replace("scale(1)", `scale(${muntiple})`)
  },
  // 绘图方法
  draw() {
    this.setData({
      finalPoints: this.data.points.map(item => {
        return Object.assign({}, item, {
          newstyle: this.objTostring(item.style)
        })
      })
    })
    this.setData({
      finalLines: this.data.lines.map(item => {
        return Object.assign({}, item, {
          newstyle: this.objTostring(item.style)
        })
      })
    })
  },
  // 数据准备（点和线）
  dataPrep(e, zoom) {
    this.setData({
      points: this.data.points.concat({
        id: this.data.currentPoint, //点的id
        x: e.x, //x坐标
        y: e.y, //y坐标
        style: {
          width: zoom === 1 ? '10rpx' : '20rpx',
          height: zoom === 1 ? '10rpx' : '20rpx',
          'border-radius': '50%',
          'background-color': 'red',
          position: "absolute",
          top: e.y - 5 + 'rpx',
          left: e.x - 5 + 'rpx',
        }
      })
    })
    let lineWidth = this.getDistace(this.data.points[this.data.currentPoint - 1], this.data.points[this.data.currentPoint])
    let midPoint = this.getMiddlePoint(this.data.points[this.data.currentPoint - 1], this.data.points[this.data.currentPoint])
    let degree = this.calcAngleDegrees(this.data.points[this.data.currentPoint - 1], this.data.points[this.data.currentPoint])
    let piancha = this.getHeorizonWidth(this.data.points[this.data.currentPoint - 1], midPoint)

    this.setData({
      currentPoint: this.data.currentPoint + 1
    })
    if (this.data.currentPoint > 1) {
      this.setData({
        lines: this.data.lines.concat({
          id: this.data.currentPoint - 1,
          style: {
            height: 0,
            // height: zoom === 1 ? '2rpx' : '4rpx',
            position: 'absolute',
            // 'background-color': 'red',
            'border-bottom': `dotted ${zoom === 1 ? '4rpx' : '8rpx'} red`,
            width: lineWidth + 'rpx',
            transform: "rotateZ(" + degree + "deg) scale(1)",
            top: midPoint ? midPoint['y'] + 1 * zoom + 'rpx' : null,
            left: midPoint ? midPoint['x'] + 1 * zoom - lineWidth / 2 + 'rpx' : null
          }
        }),
      })
    }
  },
  // 缩放点和线
  zoomPAndL(multiple) {
    console.log(multiple);
    this.setData({
      locations: this.data.locations.map(item => {
        return Object.assign({}, {
          type: item.type,
          x: item.x * multiple,
          y: item.y * multiple
        })
      }),
      points: this.data.points.map(item => {
        return Object.assign({}, item, {
          x: item.x * multiple,
          y: item.y * multiple,
          style: {
            width: this.strToNum(item.style.width) * multiple + 'rpx',
            height: this.strToNum(item.style.height) * multiple + 'rpx',
            'border-radius': '50%',
            'background-color': 'red',
            position: "absolute",
            top: this.strToNum(item.style.top) * multiple + 'rpx',
            left: this.strToNum(item.style.left) * multiple + 'rpx'
          }
        })
      }),
      lines: this.data.lines.map((item, index, arr) => {
        var newPiancha
        if (index > 0) {
          newPiancha = this.getDistace(arr[index - 1], arr[index])
        }
        console.log(item.style.left);
        return Object.assign({}, item, {
          id: item.id,
          style: {
            height: 0,
            // height: this.strToNum(item.style.height) * multiple + 'rpx',
            position: 'absolute',
            // 'background-color': 'red',
            'border-bottom': this.dottedLineReg(item.style['border-bottom'], multiple),
            width: this.strToNum(item.style.width) * multiple + 'rpx',
            transform: item.style.transform,
            top: this.strToNum(item.style.top) * multiple + 'rpx',
            left: this.strToNum(item.style.left + newPiancha) * multiple + 'rpx',
          }
        })
      })
    })
  },
  // 点击地图方法
  drawPoint(e) {
    let point = e.currentTarget.dataset.point
    console.log(point);
    this.dataPrep(point, this.data.zoom)
    this.draw()
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    timer = null
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