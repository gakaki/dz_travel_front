import { spliceStr } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGold: 777,
    testStr: '飒飒东风敢死队风格撒旦发个立刻就是独立开发国家实力肯定JFK了对方公司了快递发给都说了开发工具士大夫敢死队风格',
    canPhoto: false, 
    isGetPost: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      testStr: spliceStr(this.data.testStr, 46)
    })
  },
  getPost() {
    this.setData({
      isGetPost: true
    })
  },
  hidePost() {
    this.setData({
      isGetPost: false,
      canPhoto: true
    })
  },
  toBuy() {
    this.hidePop()
    
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