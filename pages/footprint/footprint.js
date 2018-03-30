// pages/footprint/footprint.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySelf:true,
    mapConWd: 750,
    mapConHt: 970,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    this.setData({ userInfo })
    console.log(userInfo)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})