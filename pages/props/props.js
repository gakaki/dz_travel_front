// pages/props/props.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tabOne: true,
  tabTwo: false,
  tabThree: false,
  myGold: 77,
  popCar: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  aa() {

  },
  rentCar() {
    this.setData({
      popCar: true
    })
  },
  hideCar() {
    this.setData({
      popCar: false
    })
  },
  clkOne() {
    this.setData({
      tabOne: true,
      tabTwo: false,
      tabThree: false
    })
  },
  clkTwo() {
    this.setData({
      tabOne: false,
      tabTwo: true,
      tabThree: false
    })
  },
  clkThree() {
    this.setData({
      tabOne: false,
      tabTwo: false,
      tabThree: true
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