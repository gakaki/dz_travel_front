import { spliceStr } from '../../utils/util.js'
import {  ymd } from '../../utils/rest.js'
import { Photograph } from '../../api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    season: '',
    weather: 'sun',
    myGold: 0,
    oldStr: '飒飒东风敢死队风格撒旦发个立刻就是独立开发国家实力肯定JFK了对方公司了快递发给都说了开发工具士大夫敢死队风格飒飒东风敢死队风格撒旦发个立刻就是独立开发国家实力肯定JFK了对方公司了快递发给都说了开发工具士大夫敢死队风格',
    testStr: '飒飒东风敢死队风格撒旦发个立刻就是独立开发国家实力肯定JFK了对方公司了快递发给都说了开发工具士大夫敢死队风格飒飒东风敢死队风格撒旦发个立刻就是独立开发国家实力肯定JFK了对方公司了快递发给都说了开发工具士大夫敢死队风格',
    canPhoto: true,
    isGetPost: false,
    toTop: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.season)
    this.setData({
      season: app.globalData.season,
      weather: app.globalData.weather,
      myGold: app.globalData.gold ? app.globalData.gold : 0,
      date: ymd('cn')
    })
    wx.setNavigationBarTitle({
      title: '景点观光'
    })
    console.log(123)
    this.spliceStr()
  },
  spliceStr() {
    let str = spliceStr(this.data.testStr, 46)
    this.setData({
      testStr: str
    })
  },
  checkMore(e) {
    this.setData({
      toTop: !this.data.toTop
    })
    if (this.data.testStr == this.data.oldStr) {
      this.spliceStr()
    } else {
      this.setData({
        testStr: this.data.oldStr
      })
    }

  },
  getPost() {
    this.setData({
      isGetPost: true
    })
    // let req = new Photograph();
    // req.cityId = 0;
    // req.fetch().then(() => {

    // })
  },
  hidePost() {
    this.setData({
      isGetPost: false,
      canPhoto: true
    })
  },
  toBuy() {
    this.hidePop()
    wx.navigateTo({
      url: '../props/props',
    })
  },
  hidePop() {
    this.setData({
      canPhoto: false
    })
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