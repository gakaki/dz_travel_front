const sheet = require('../../sheets.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldInfo: sheet.pays,
    gCount: 0,
    mCount: 0,
    pop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值商城'
    })
    console.log(this.data.goldInfo)
  },
  hide() {
    this.setData({
      pop: false
    })
  },
  toBuy() {
    this.hide()
  },
  isBuy(e) {
    let obj = this.data.goldInfo[e.currentTarget.dataset.idx]
    this.setData({
      gCount: obj.gold,
      mCount: obj.pay,
      pop: true
    })
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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