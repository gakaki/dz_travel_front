// pages/testmap/testmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // return;
    let areas = this.data.areas;
    for (let i = 0; i < 17; i++) {
      let a = {};
      a.x = i % 8 * 81;
      a.y = Math.floor(i / 8) * 81 + 10;
      a.imgWd = 81;
      a.imgHt = 81;
      a.statusImgs = ["../../assets/index/index.png", "../../assets/index/index-gray.png"];
      areas.push(a);
    }

    this.setData({areas})
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