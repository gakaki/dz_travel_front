import { spliceStr } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secTa: true,
    tipPOp: false,
    nn: '速度放缓的风格和的风格和'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nn: spliceStr(this.data.nn,6)
    })
  },
  hideTipPop() {
    this.setData({
      tipPOp: false
    })
  },
  formSubmit(e) {
    let str = e.detail.value.ta1 + e.detail.value.ta2
    this.setData({
      tipPOp: true
    })
  },
  bindInput(e) {
    if (e.detail.cursor == 54) {

      this.setData({
        secTa: false
      })
    }
  },
  bindInputSec(e) {
    if (e.detail.cursor == 0) {
      this.setData({
        secTa: true
      })
    }
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