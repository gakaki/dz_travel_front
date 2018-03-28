// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPop: false,
    isFirstIn: false,
    isGetPost: false,
    canPhoto: false,
    isCongratulations: false,
    isMissionOpen: false,
    isShowIntro: false,
    points: [],
    finalPoints: [],
    lines: [],
    finalLines: [],
    currentPoint: 0,
    css: {
      color: 'red',
      fontSize: '30rpx'
    },
    newcss: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 划线的方法集
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
  // 画点方法
  drawPoint(e) {
    console.log(e);
    this.setData({
      points: this.data.points.concat({
        id: this.data.currentPoint, //点的id
        x: e.detail.x, //x坐标
        y: e.detail.y, //y坐标
        style: {
          width: '10rpx',
          height: '10rpx',
          'border-radius': '50%',
          'background-color': 'red',
          position: "absolute",
          top: 2 * e.detail.y - 5 + 'rpx',
          left: 2 * e.detail.x - 5 + 'rpx',
        }
      })
    })
    this.setData({
      finalPoints: this.data.points.map(item => {
        return Object.assign({}, item, {
          newstyle: this.objTostring(item.style)
        })
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
            height: '2rpx',
            position: 'absolute',
            'background-color': 'red',
            width: 2 * lineWidth + 'rpx',
            transform: "rotateZ(" + degree + "deg)",
            top: midPoint ? 2 * midPoint['y'] - 1 + 'rpx' : null,
            left: midPoint ? 2 * midPoint['x'] - 1 - lineWidth + 'rpx' : null
          }
        }),
      })
      this.setData({
        finalLines: this.data.lines.map(item => {
          return Object.assign({}, item, {
            newstyle: this.objTostring(item.style)
          })
        })
      })
    }
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
  onShow: function () {

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